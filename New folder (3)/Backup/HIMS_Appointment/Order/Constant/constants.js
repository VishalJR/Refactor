const invalid = "invalid data"
const nameUnavailable = "Name should not be empty"
const nameExists= "Name exists already"
const DescriptionUnavailable = "Description should not be empty"
const ProfileViewUnavailable = "Profile View should not be empty"
const NoProviderProfileMaster = "No provider Profile Master"
const dateInvalid = "The date is invalid"
const dataInvalid = "data not found"
const dataInvalidAddress = "address not found"
const userInvalid = "user not found"
const userExists = "user already exists"
const phoneNumberInvalid = "invalid phone number"
const phoneNumberAlready = "Profile already exists"
const phoneNumberMissing = 'phone number is missing'
const phoneExists = "phone number does not exist"
const phoneNumberIncorrect = 'phone number or password are incorrect'
const authorization = "unauthorized user"
const unAuthorization = "This user is cannot access"
const domainExists = "Domain already exists"
const emailMissing = 'email is missing'
const EmailNotValid = 'email not valid'
const EmailAlreadyExists = "email already exists"
const profileExists = "Profile already exists"
const profileNotFound = "Profile not found"
const roleMissing = 'role is missing'
const roleExists = "Role already exists"
const roleNotMatch = 'Role id doesn`t match'
const roleInactive = 'Role is not active or deleted'
const deactivate = 'contact to admin. Your account is de-activated'
const currentPassword = 'current password is missing'
const newPassword = 'new password is missing'
const specialtyMissing = 'specialty is missing'
const specialtyNotFound = 'specialty is not found'
const specialtyMasterInvalid = 'specialtyMaster not found'
const passwordMissing = 'password is missing'
const passwordIncorrect = 'Password is incorrect!'
const passwordValid = 'Password must contains a mixture of alphanumeric and special characters'
const passwordChange = 'Password changed  successfully'
const firstNameMissing = 'First Name is missing'
const createMessage = "created successfully"
const getMessage = "fetch data successfully"
const updateMessage = "updated successfully"
const remove = "already deleted"
const approveMessage = "approved successfully"
const rejectMessage = "reject successfully"
const submitMessage = "document submitted successfully"
const searchMessage = "search user successfully"
const originMessage = 'origin is missing'
const queryMessage = "query is missing"
const queryParamsStatusMessage = "query param status field is missing"
const errorMessage = "something went wrong"
const doctorRemainder = "Doctor availability for only 30 mins"
const startTime = "please check start time"
const endTime = "please check end time"
const endDate = "please check end date"
const dateTime = "please check available date and time "
const doctorAvailable = "Doctor availability was created successfully"
const doctorNotAvailable = "Doctor not available"
const doctorNotFound = "Doctor not found"
const nameExits = "name already exists"
const domainMissing = "domain name is missing"
const domainNotFound = "domain name is not found"
const websiteExits = 'website already exits'
const tenantAlreadyExits = 'tenant already exits'
const superAdminAccess = 'Super admin only have access to login'
const loginSuccess = 'login successfully'
const tokenMissing = 'token is missing'
const adminSuperAdmin = 'Role is not an admin or superAdmin'
const tenantAccess = 'access denied tenant is mismatched'
const access = 'you don`t have access'
const querySubmittedMissing = 'query param submitted field is missing'
const deletedSuccessfully = 'query param submitted field is missing'
const detail= 'Detail is missing'
const order_type = 'Order type is missing'
const doctor_specialists = 'Doctor speciality is missing'



module.exports = {
    superAdminAccess, tenantAlreadyExits, websiteExits, domainMissing, nameExits, doctorNotAvailable, doctorAvailable, dateTime, endDate, endTime,
    startTime, doctorRemainder, errorMessage, queryMessage, queryParamsStatusMessage, originMessage, searchMessage, submitMessage, rejectMessage, approveMessage, remove,
    updateMessage, getMessage, invalid, dateInvalid, firstNameMissing, createMessage, passwordChange, passwordValid, passwordIncorrect, passwordMissing,
    specialtyMasterInvalid, specialtyNotFound, specialtyMissing, newPassword, dataInvalid, authorization, roleInactive, dataInvalidAddress, userInvalid,
    userExists, phoneNumberInvalid, phoneNumberAlready, phoneNumberMissing, currentPassword, phoneExists, phoneNumberIncorrect, unAuthorization, emailMissing,
    domainExists, EmailNotValid, EmailAlreadyExists, profileNotFound, roleMissing, profileExists, roleNotMatch, domainNotFound, roleExists, deactivate, loginSuccess,
    tokenMissing, adminSuperAdmin, tenantAccess, access, doctorNotFound, querySubmittedMissing,deletedSuccessfully,nameUnavailable,DescriptionUnavailable, ProfileViewUnavailable,nameExists,NoProviderProfileMaster,detail,order_type,doctor_specialists
}