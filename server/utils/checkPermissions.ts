import {AccessDeniedError} from "../errors";

export default function checkPermissions(requestUser: any, resourceUserId: any) {
    //TODO Validate user role to access a specific route
    console.log(requestUser)
    if (requestUser.role === 'admin') return
    if (requestUser.userId === resourceUserId.toString()) return
    throw new AccessDeniedError("Insufficient permissions for this action")
}