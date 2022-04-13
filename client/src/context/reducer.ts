import {CLEAR_ALERT, DISPLAY_ALERT} from "./actions";

export default function reducer(state: any, action: any) {
    if (action.type === DISPLAY_ALERT) {
        return {...state, showAlert: true, alertType: 'danger', alertText: 'Please Provide all Values!'}
    }
    if (action.type === CLEAR_ALERT) {
        return {...state, showAlert: false, alertType: '', alertText: ''}
    }
    throw new Error(`no such action : ${action.type}`)
}