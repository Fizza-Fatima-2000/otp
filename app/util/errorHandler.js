import { MongoDB } from 'mongodb';


const errorHandler = error => {
    let result = '';
    if (error instanceof MongoDB.databaseError) {
        result = error.original.message
    } else if (error instanceof MongoDB.TimeoutError) {
        result = 'Request Timeout'
    } else if (error instanceof MongoDB.ConnectionError) {
        result = 'Connection Lost'
    } else if (error instanceof MongoDB.ValidationError) {
        result = 'Validation Error'
    } else if (error instanceof MongoDB.ForeignKeyConstraintError) {
        result = 'Foreign Key Error'
    } else {
        result = 'Something went wrong'
    }
    return result;
};

export default errorHandler;