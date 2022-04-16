import StatusCodes from "http-status-codes";
import CustomApiError from "./custom-api";

export default class NotFoundError extends CustomApiError {
    constructor(message) {
        super(message);
        // @ts-ignore
        this.statusCode = StatusCodes.NOT_FOUND
    }
}