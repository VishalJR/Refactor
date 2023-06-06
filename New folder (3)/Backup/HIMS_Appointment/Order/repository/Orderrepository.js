const db = require(`../dbConfig/postgresql`);
const { Sequelize, Op } = require("sequelize");

class orderRepository {
    // create a item
    async create(data, TableName) {
        var schema = await Schema(TableName)
        const result = await schema.create(data)
        console.log('result._previousDataValues.uuid', result._previousDataValues.uuid);
        return result._previousDataValues
    }

    //update a item using key/value pairs
    async updateOne(key, attributeName, attributeValue, TableName) {
        var data = {}
        data[attributeName] = attributeValue
        console.log('data', data);
        var schema = await Schema(TableName)
        const result = await schema.update(data, { where: key });
        return result
    }

    //update multiple items using key/value pairs
    async updateMultipleFields(key, data, TableName) {
        console.log("key",key,"data",data,"tableName",TableName);
        var schema = await Schema(TableName)
        const result = await schema.update(data, { where: key });
        console.log(result,"result is ");
        return result
    }

    //get all items from table
    async GetAllItems(TableName) {
        var schema = await Schema(TableName)
        const result = await schema.findAll();
        return result
    }

    //get one item from table
    async GetOne(key, TableName) {
        console.log('key', key);
        var schema = await Schema(TableName)
        const result = await schema.findOne({ where: key })
        return result
    }

    //delete one item from table with given key
    async deleteByID(uuid, TableName) {
        console.log('key', key);
        var schema = await Schema(TableName)
        const result = await schema.destroy({ where: { uuid: uuid } })
        return result
    }

    //batch delete all items from table using uuid
    async batchDelete(uuids, TableName) {
        console.log('key', key);
        var schema = await Schema(TableName)
        const result = await schema.destroy({
            where: {
                uuid: {
                    [Op.in]: uuids
                }
            }
        });
        return result
    }

    //batch delete all items from table using uuids
    async deleteByFilter(key, TableName) {
        console.log('key', key);
        var schema = await Schema(TableName)
        const result = await schema.destroy({ where: key })
        return result
    }

    //get all items from table using jsonb datatype array 
    async queryArray(TableName, key, value) {
        console.log('key', key);
        var schema = await Schema(TableName)
        console.log('schema', schema);
        const searchValue = value;
        const result = await schema.findAll({
            where: {
                'domain': {
                    [Op.contains]: [searchValue]
                }
            }
        });
        return result
    }

    //get all items from table using AND operator
    async queryItemsByAttributesOrIN(TableName, key) {
        console.log('key', key);
        var schema = await Schema(TableName)
        console.log('schema', schema);
        const result = await schema.findAll({
            where: {
                [Op.or]: [key]
            }
        });

        return result
    }

    //get all items from table using OR operator
    async queryItemsByAttributesAndIN(TableName, key) {
        // console.log('key', key);
        var schema = await Schema(TableName)
        const result = await schema.findAll({
            where: {
                [Op.and]: [key]
            }
        });

        return result
    }

    //get item using key and value 
    async ScanItemsByAttributeValue(key, value, TableName) {
        console.log('key', key);
        var schema = await Schema(TableName)
        const result = await schema.findOne({ where: { key: value } })
        return result
    }

}

async function Schema(tableName) {
    if (tableName == 'order') {
        var table = db.Order
        return table
    }
    if (tableName == 'Doctor_order') {
        var table = db.DoctorOrder
        return table
    }  
}

async function findAll(){
    
}
module.exports = new orderRepository();