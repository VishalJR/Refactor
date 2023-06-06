module.exports = (database, Sequelize) => {
    const DoctorOrder = database.define('Doctor_order', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            unique: true,
        },
        order_id:{
            type:Sequelize.UUID,
            allowNull:true
        },
        order_type: {
            type: Sequelize.STRING,
            allowNull:true,
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
            defaultValue:"Pending"

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
        updated_by: {
            type: Sequelize.UUID,
            allowNull: true
        },
        modified_by: {
            type: Sequelize.UUID,
            allowNull:true
        },
        modified_at: {
            type: Sequelize.UUID,
            allowNull:true
        },
        specialty_id: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        
        is_rejected:{
            type:Sequelize.BOOLEAN,
            allowNull:true,
            defaultValue:false
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
        accepted_date: {
            type: Sequelize.STRING,
            allowNull: true
        },
        rejected_date: {
            type: Sequelize.STRING,
            allowNull: true
        },       
        tenant_id: {
            type: Sequelize.UUID,
            allowNull: true
        },
    },
        {
            timeStamps: true,
            
        
        })
        
        
    return DoctorOrder
   
}
