import StatusCodes from "http-status-codes";
import CustomApiError from "./custom-api";
// Bad password, expired token, etc...
export default class UnauthenticatedError extends CustomApiError {
    constructor(message) {
        super(message);
        // @ts-ignore
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}