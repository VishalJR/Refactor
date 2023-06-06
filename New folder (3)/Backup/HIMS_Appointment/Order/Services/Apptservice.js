const orderRepository = require('../repository/Orderrepository');
const dynamoRepository = require('../repository/dynamodbRepository')
const tableNames = require('../Constant/dbTableName');
const db = require('../dbConfig/postgresql')
const payment = db.Payment
const Doctor_order = require('../schema/Provider/DoctorOrder')

class AppointmentService {
  async createOrder(req, res, tableName) {
    try {
      var body = req.body
      if (body.order_type == "on_demand") {
        const uuid = req.id
        console.log(key);
        var key, userCheck, checkUser
        if (req.role_name == "helpdesk") {
          if (body.phone_number == "" || body.phone_number == undefined) {
            return res.status(400).json({ message: "Please enter a phone number" })
          } else if (body.phone_number) {
            key = {
              "phone_number": body.phone_number,
              "tenant_id": req.tenant_id
            }
            userCheck = await dynamoRepository.queryItemsByAttributesAndIN(tableNames.users, key)
            if (userCheck.length == 0) {
              return res.status(400).json({ message: "Mobile number not available" })
            }
            body.created_by = uuid
            body.updated_by = uuid
            body.consumer_id = userCheck[0].uuid

          }

        } else {
          key = { "uuid": uuid }
          checkUser = await dynamoRepository.GetOne(key, tableNames.users)
          body.created_by = uuid
          body.updated_by = uuid
          body.consumer_id = uuid

        }

        var SpecKey = {
          "uuid": body.specialty_id,
          "tenant_id": req.tenant_id
        }
        var specialityCheck = await dynamoRepository.queryItemsByAttributesAndIN(tableNames.specialty_master, SpecKey)
        // console.log(specialityCheck.uuid);
        if (specialityCheck.length == 0) {
          return res.status(400).json({ status: "Failed", message: "Specialty not available" })
        }
        const specialtyGet = {

          "specialty_id": body.specialty_id
          //tenant
        }

        let result = []
        console.log(1)
        const SpecialtyResponse = await dynamoRepository.queryItemsByAttributesAndIN(tableNames.doctor_specialty, specialtyGet)
        console.log(SpecialtyResponse)
        if (SpecialtyResponse.length == 0) {
          return res.status(400).json({ message: "Doctor unavailable" })
        }


        body.tenant_id = req.tenant_id
        body.amount = specialityCheck[0].specialtyAmount
        var createAppt = await orderRepository.create(body, tableName)
        // console.log(createAppt);
        for (let i = 0; i < SpecialtyResponse.length; i++) {
          var request = {}
          request.order_id = createAppt.uuid
          request.order_type = body.order_type
          request.consumer_id = uuid
          request.provider_id = SpecialtyResponse[i].user_id
          request.order_status = createAppt.order_status
          request.created_by = createAppt.created_by
          request.specialty_id = createAppt.specialty_id
          request.tenant_id = createAppt.tenant_id
          request.updated_by = createAppt.updated_by
          console.log("the request is ", request, tableNames.doctor_order)
          var datas = await orderRepository.create(request, tableNames.doctor_order)

          result.push(datas)

        }

        console.log("the value is ", result)
        var createPay = await payment.create({
          order_id_id: createAppt.uuid,
          total_amount: specialityCheck[0].specialtyAmount,
          paid_amount: body.paid_amount,
          created_by: uuid,
          updated_by: uuid,
          tenant_id: req.tenant_id
        })
        if (createPay.paid_amount < 120) {
          createPay.payment_status = "Partially Paid"
          let dueAmount
          dueAmount = createPay.total_amount - createPay.paid_amount
          createPay.due = dueAmount
        }
        else {
          createPay.payment_status = 'Paid'
          createPay.settlement_status = true
        }
        await createPay.save()
        return res.status(201).json({ message: 'Created Successfully', result: createAppt.uuid })
      }
      else if (body.order_type == "scheduled"){
        
      }
      else {
        return res.status(400).json({ message: "Only OnDemand is available " })
      }
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: 'Error', result: error.message })
    }
  }
  async updateOrder(req, res, tableName) {
    try {
      const uuid = req.params.uuid
      console.log('uuod', uuid);
      var key = { 'uuid': uuid }
      console.log('212', key);
      console.log('12', tableName);
      const checkAppt = await orderRepository.GetOne(key, tableName)
      console.log(1212, checkAppt);
      if (checkAppt.is_active == false) {
        return res.status(400).json({ status: "Failed", message: "Cant update deleted Appointment" })
      }
      const request = req.body
      const data = await orderRepository.updateMultipleFields(key, request, tableName)
      return await res.status(200).json({ message: 'Updated Succesfully', result: data })
    } catch (error) {
      return res.status(400).json({ status: "Went wrong", result: error.message })
    }

  }
  //order search
  async OrderSearch(req, res, tableName) {
    try {
      //admin and super admin
      if (req.role_name == 'admin' || req.role_name == 'super_admin') {
        var query = req.query

        if (req.headers.origin == "" || req.headers.origin == undefined) {
          return res.status(400).json({ message: 'origin is missing' })
        }

        const checkTenant = await dynamoRepository.queryArray('tenant', 'domain', req.headers.origin)
        if (checkTenant.length == 0) {
          return res.status(400).json({ message: 'domain not found' })
        }
        query.tenant_id = checkTenant[0].uuid
        const ordersResponse = await orderRepository.queryItemsByAttributesAndIN(tableName, query)
        if (ordersResponse.length == 0) {
          return res.status(400).json({ message: "no order found", data: [] })
        } else {
          return res.status(200).json({ message: "fetch orders details successfully", data: ordersResponse })
        }
      }

      //help desk
      if (req.role_name == 'helpdesk') {
        //get all appointments by patients 
        if (req.query.phone_number != '') {
          var phoneNumberFilter = {
            'phone_number': req.query.phone_number
          }
          const consumerResponse = await dynamoRepository.queryItemsByAttributesAndIN(tableNames.users, phoneNumberFilter)
          if (consumerResponse.length == 0) {
            return res.status(400).json({ message: "no user found", data: 'no consumer found' })
          }

          var filter = req.query
          filter.tenant_id = req.tenant_id
          filter.consumer_id = consumerResponse[0].uuid

          const orderResponse = await orderRepository.queryItemsByAttributesAndIN(tableName, filter)
          if (orderResponse.length == 0) {
            return res.status(400).json({ message: "no order found", data: [] })
          } else {
            return res.status(400).json({ message: "no order found", data: orderResponse })
          }

        } else {
          //get all appointments from help desk for tenant id
          var filter = req.query
          filter.tenant_id = req.tenant_id
          const orderResponse = await orderRepository.queryItemsByAttributesAndIN(tableName, query)
          if (orderResponse.length == 0) {
            return res.status(400).json({ message: "no order found", data: [] })
          } else {
            return res.status(400).json({ message: "no order found", data: orderResponse })
          }
        }
      }

      //patient
      if (req.role_name == 'patient') {
        var query = req.query
        query.consumer_id = req.id
        query.tenant_id = req.tenant_id

        const orderResponse = await orderRepository.queryItemsByAttributesAndIN(tableName, query)
        if (orderResponse.length == 0) {
          return res.status(400).json({ message: "no order found", data: [] })
        } else {
          return res.status(400).json({ message: "no order found", data: orderResponse })
        }
      }

      //doctor
      if (req.role_name == 'doctor') {
        query.provider_id = req.id
        query.tenant_id = req.tenant_id

        const orderResponse = await orderRepository.queryItemsByAttributesAndIN(tableName, query)
        if (orderResponse.length == 0) {
          return res.status(400).json({ message: "no order found", data: [] })
        } else {
          return res.status(200).json({ message: "appointments fetched successfully", data: orderResponse })
        }
      }
    }
    catch (error) {
      return await res.status(400).json({ message: 'something sent wrong', result: error.message })
    }
  }
  //order pending and order rejected
  async OrderProviderSearch(req, res, tableName) {
    try {
      var query = req.query
      query.provider_id = req.id
      const orderResponse = await orderRepository.queryItemsByAttributesAndIN(tableName, query)
      if (orderResponse.length == 0) {
        return res.status(400).json({ message: "no order found", data: [] })
      } else {
        return res.status(400).json({ message: "doctor appointments fetched successfully", data: orderResponse })
      }
    } catch (error) {
      return res.status(400).json({ message: "something sent wrong", data: orderResponse })
    }
  }
}

module.exports = new AppointmentService()
