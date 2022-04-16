import StatusCodes from "http-status-codes";
import CustomApiError from "./custom-api";

export default class AccessDeniedError extends CustomApiError {
    constructor(message) {
        super(message);
        // @ts-ignore
        this.statusCode = StatusCodes.FORBIDDEN
    }
}