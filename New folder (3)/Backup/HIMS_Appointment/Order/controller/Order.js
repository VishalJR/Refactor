const orderService = require('../Services/Apptservice');
const tableName = require('../Constant/dbTableName')

class AppointmentController {

  async createOrder(req, res) {
    var response = await orderService.createOrder(req, res, tableName.order)
    return response
  }

  async updateOrder(req, res) {
    var response = await orderService.updateOrder(req, res, tableName.order)
    return response
  }

  async OrderSearch(req, res) {
    var response = await orderService.OrderSearch(req, res, tableName.order)
    return response
  }

  async OrderProviderSearch(req, res) {
    var response = await orderService.OrderProviderSearch(req, res, tableName.doctor_order)
    return response
  }
}


module.exports = new AppointmentController()
