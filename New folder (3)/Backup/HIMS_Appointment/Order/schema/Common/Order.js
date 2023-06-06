module.exports = (database, Sequelize) => {
    const Order = database.define('orders', {
        uuid: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            unique: true,
        },
        order_type: {
            type: Sequelize.STRING,
            allowNull:true,
              },
        detail:{
                 type:Sequelize.JSONB,
                 allowNull:false
        },
        consumer_id: {
            type: Sequelize.UUID,
            allowNull: false
        },
        provider_id: {
            type: Sequelize.UUID,
            allowNull: true
        },
        order_status: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue:"pending"

        },
        call_completed: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue:false
        },
        order_completed: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue:false
        },
        created_by: {
            type: Sequelize.UUID,
            allowNull: true
        },
        updated_by:{
            type:Sequelize.UUID,
            allowNull:true
        },
        modified_by: {
            type: Sequelize.UUID,
            allowNull:true
        },
        modified_at: {
            type: Sequelize.INTEGER,
            allowNull:true
        },
        specialty_id: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        amount: {
            type: Sequelize.FLOAT,
            allowNull: true,
            
        },        
        is_active: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue:true
        },
        is_deleted:{
            type:Sequelize.BOOLEAN,
            allowNull:true,
            defaultValue:false
        },
        appointmentdate:{
            type:Sequelize.STRING,
            allowNull:true
        },
        appointmentendtime:{
            type:Sequelize.STRING,
            allowNull:true
        },
        appointmentendtime
        accepted_date: {
            type: Sequelize.STRING,
            allowNull: true
        },
        rejected_date: {
            type: Sequelize.STRING,
            allowNull: true
        },
        lab:{
            type:Sequelize.JSONB,
            allowNull:true,
            defaultValue:{}
        },
        RX:{
            type:Sequelize.JSONB,
            allowNull:true,
            defaultValue:{}
        },
        Notes:{
            type:Sequelize.JSONB,
            allowNull:true,
            defaultValue:{}
        },        
        tenant_id: {
            type: Sequelize.UUID,
            allowNull: true
        },
    },
        {
            timeStamps: true,
            
        
        })
        
        
    return Order
   
}
