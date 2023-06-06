const orderController = require('../controller/Order');
const { VerifyToken, Authorize } = require('../Middleware/auth');
const validation = require('../Middleware/Validation/validation')
const express = require('express')
const router = express.Router();

router.post('/create_appointment', VerifyToken,
    Authorize(['helpdesk', 'patient']),
    validation.OrderValidation,
    orderController.createOrder
);

router.patch('/update_appointment/:uuid', VerifyToken,
    Authorize(['helpdesk', 'patient']),
    orderController.updateOrder
);

router.get('/order_search', VerifyToken,
    Authorize(['helpdesk', 'doctor', 'patient', 'admin', 'super_admin']),
    orderController.OrderSearch
)


router.get('/provider_order_search/:id', VerifyToken,
    Authorize(['doctor']),
    orderController.OrderProviderSearch
)

module.exports = router;

