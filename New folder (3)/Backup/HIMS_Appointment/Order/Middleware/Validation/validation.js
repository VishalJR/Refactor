
const message = require('../../Constant/constants')

class OrderValidation {
     
       OrderValidation(req,res,next){
          try {
            
             if(req.body.order_type==''|| req.body.order_type == undefined)
             {
                return res.status(400).json({status:"Failed",message:message.order_type})            
            }
            if(req.body.order_type=='on_demand'){
            if(req.body.detail==''|| req.body.detail == undefined)
             {
                return res.status(400).json({status:"Failed",message:message.dx_notes})            
            }
            if(req.body.specialty_id==''|| req.body.specialty_id== undefined)
             {
                return res.status(400).json({status:"Failed",message:message.doctor_specialists})            
            }
                
          }
          else if(req.body.order_type=='scheduled'){
                if(req.body.appointmentdate=='' || req.body.appointmentdate == undefined){
                  return res.status(400).json({status:"Failed",message:"Appointment start date must not be empty"})
                }
                if(req.)
          }
          next()
          } catch (error) {
            return res.status(400).json(error.message)
          }
       }
}

module.exports = new OrderValidation ()