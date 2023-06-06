const dynamoRepository = require('../repository/dynamodbRepository')
const tableNames = require('../Constant/dbTableName');

class ConsumerUpdate {
    async ConsumerUpdate(req) {
        try {
            var consumerProfileMaster = await dynamoRepository.GetAllItems('consumer_profile_master')

            if (req.role_name = 'helpdesk') {
                var filter = {
                    'phone_number': req.query.phone_number
                }
                var users = await dynamoRepository.queryItemsByAttributesAndIN(tableNames.users, filter)
                req.id = users[0].uuid
            }
            for (var i in consumerProfileMaster) {
                var filterConsumer = {
                    'consumer_id': req.id,
                    'profile_name_id': consumerProfileMaster[i].uuid,
                    'tenant_id': req.tenant_id
                }
                var consumerProfile = await dynamoRepository.queryItemsByAttributesAndIN(tableNames.consumerProfile, filterConsumer)
                if (consumerProfile.length != 0) {
                    for (var detailKey in req.body.details) {
                        for (var detailObjectKey in req.body.details[detailKey]) {
                            for (var consumerProfileKey in consumerProfile[0].detail) {
                                if (consumerProfileKey == detailObjectKey) {
                                    consumerProfile[0].detail[consumerProfileKey].value = req.body.details[detailKey][detailObjectKey].value
                                }
                            }
                        }
                    }
                    try {
                        var filterUpdate = {
                            'uuid': consumerProfile[0].uuid
                        }
                        var request = {
                            'detail': consumerProfile[0].detail,
                            'is_active': consumerProfile[0].is_active,
                            'is_delete': consumerProfile[0].is_delete,
                            'profile_name_id': consumerProfile[0].profile_name_id,
                            'tenant_id': consumerProfile[0].tenant_id,
                            'created_by': consumerProfile[0].created_by
                        }
                        var consumerProfileUpdate = await dynamoRepository.updateMultipleFields(filterUpdate, request, tableNames.consumerProfile)
                    } catch (errors) {
                        console.log('message: errors.message ', errors.message);
                        return 'failed'
                    }
                    var request = {
                        'consumer_id': consumerProfile[0].consumer_id,
                        'detail': consumerProfile[0].detail,
                        'is_active': consumerProfile[0].is_active,
                        'is_delete': consumerProfile[0].is_delete,
                        'profile_name_id': consumerProfile[0].profile_name,
                        'tenant_id': consumerProfile[0].tenant_id,
                        'created_by': consumerProfile[0].created_by
                    }
                    try {
                        var consumerProfile = await dynamoRepository.create(request, tableNames.consumerProfileHistory)
                    } catch (err) {
                        return 'failed'
                    }
                }
            }
            return 'success'
        } catch (err) {
            return undefined
        }
    }
}

module.exports = ConsumerUpdate