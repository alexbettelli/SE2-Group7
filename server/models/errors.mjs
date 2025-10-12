export class AppError{
    constructor(message, description){
        this.message = message;
        this.description = description;
    }
}

export class InternalServerError extends AppError {
    constructor(){
        super('Internal Server Error', 'An unpredictable error occurred')
    }
}