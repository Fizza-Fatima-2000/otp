const Validator = require('validatorjs');


const multiValidator = (body, rules, customMessages = {}) => {
    let result = false;
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => result = { errors: null, status: true });
    validation.fails(() => result = { errors: validation.errors, status: false });
    return result;
};


const badRequest = (res, message, error = null) => {
    const body = {
        status: false, responseCode: 400, message,
    }
    if (error) body.error = error
    res.responseDescription = "Bad Request";
    return res.status(400).json(body);
};

const notFound = (res, message, error = null) => {
    const body = {
        status: false, responseCode: 404, message,
    }
    if (error) body.error = error
    res.responseDescription = "Not Found";
    return res.status(404).json(body);
}

const serverError = (res, message, error = null) => {
    const body = message
    if (error) body.error = error
    res.responseMessage = message.message;
    res.responseDescription = "Server Error";
    return res.status(500).json(body);
};

const success = (res, message, body) => {
    let _body = message;
    if (body) _body = { ..._body, ...body };
    res.responseMessage = message.message;
    res.responseDescription = "OK Success";
    return res.status(200).json(_body);
};

const validationError = (res,message, error = null) => {
    let body = {
        status: false, responseCode: 412,
        message: 'Validation Failed', data: error,
    };
    res.responseMessage = message.message;
    res.responseDescription = "Validation Error";
    return res.status(412).json(body);
};

const authError = (res,message) => {
    let body = {
        status: false, responseCode: 401,
        message: 'Authentication Error',
    };
    res.responseMessage = message.message;
    res.responseDescription = "Authentication Error";
    return res.status(401).json(body);
};

const getRawObject = (obj) => {
    let updatedObj = {};

    const getRawObjectHandler = (_obj) => {
        Object.entries(_obj).map(([key, value]) => {
            if (typeof value === 'object' && !(value instanceof Date) && !Array.isArray(value) && value !== null) {
                getRawObjectHandler(value);
            } else {
                updatedObj = { ...updatedObj, [key]: value };
            }
        })
    };

    getRawObjectHandler(obj);

    return updatedObj;
}



const censorWord = function (str,splice) {
    return str[0] + "*".repeat(str.length - 2) + str.slice(splice);
 }
 
 const censorEmail = function (email){
      var arr = email.split("@");
      return censorWord(arr[0],-1) + "@" + censorWord(arr[1],-1);
 }

 const censorPhone = function (phone){
     var start = phone.substring(0, 3);
  
     var end = censorWord(phone.substring(3, phone.length-1),-2);
     return start+end
 }

 const censorDetails = function (email,phone){
     var data={};
    data.email = censorEmail(email);
    data.phone = censorPhone(phone);
    return data;
 }

module.exports = {
    multiValidator,
    badRequest,
    serverError,
    success,
    getRawObject,
    notFound,
    validationError,
    censorDetails,
    authError
}