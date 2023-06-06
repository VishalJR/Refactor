module.exports = (database, Sequelize) => {
    const Payment = database.define('payment', {
      
        uuid: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            unique: true,
        },
        payment_currency: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue:"INR"
        },
        payment_currency_symbol:{
            type:Sequelize.STRING,
            allowNull:true,
            defaultValue:"Rs"
        },
        payment_status:{
            type:Sequelize.STRING,
            allowNull:true,
        },
        paid_amount:{
            type:Sequelize.FLOAT,
            allowNull:true
        },
        total_amount:{
             type:Sequelize.FLOAT,
             allowNull:true,
             defaultValue:120.00
        },
        created_by: {
            type: Sequelize.UUID,
            allowNull: true
        },
        modified_by: {
            type: Sequelize.UUID,
            allowNull:true
        },
        modified_at: {
            type: Sequelize.INTEGER,
            allowNull:true
        },
        order_id_id:{
            type:Sequelize.UUID,
            allowNull:true
        },
        tenant_id:{
            type:Sequelize.UUID,
            allowNull:true
        },
        settlement_status:{
            type:Sequelize.BOOLEAN,
            allowNull:true,
            defaultValue:false
        },
        due:{
            type:Sequelize.FLOAT,
            allowNull:true,
            defaultValue:0.00
        }

    
    },
    {
        timeStamps: true,
        
    
    })
    
    
return Payment

}