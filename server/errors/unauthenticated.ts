import StatusCodes from "http-status-codes";
import CustomApiError from "./custom-api";

export default class UnauthenticatedError extends CustomApiError {
    constructor(message) {
        super(message);
        // @ts-ignore
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}