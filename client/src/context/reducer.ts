import {CLEAR_ALERT, DISPLAY_ALERT, SETUP_USER_BEGIN, SETUP_USER_ERROR, SETUP_USER_SUCCESS} from "./actions";

export default function reducer(state: any, action: { type: string; payload: { user: any; token: any; location: any; alertText: any; msg: any; }; }) {
    if (action.type === DISPLAY_ALERT) {
        return {...state, showAlert: true, alertType: 'error', alertText: 'Please Provide all Values!'}
    }
    if (action.type === CLEAR_ALERT) {
        return {...state, showAlert: false, alertType: '', alertText: ''}
    }
    if (action.type === SETUP_USER_BEGIN) {
        return {...state, isLoading: true}
    }
    if (action.type === SETUP_USER_SUCCESS) {
        return {
            ...state,
            user: action.payload.user,
            token: action.payload.token,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: action.payload.alertText
        }
    }
    if (action.type === SETUP_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'error',
            alertText: action.payload.msg
        }
    }
    throw new Error(`no such action : ${action.type}`)
}