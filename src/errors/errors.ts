export class DefaultError {
    constructor(
        status: number,
        param: string,
        message: string,
        type: 'MissingValueError' | 'ValueError' | 'UnexpectedError'
    ) {
        this.status = status
        this.message = message
        this.param = param
        this.type = type
    }

    status: number
    message: string
    type: string
    param: string

    toJson() {
        return {
            'message': this.message,
            'param': this.param,
            'type': this.type
        }
    }
}