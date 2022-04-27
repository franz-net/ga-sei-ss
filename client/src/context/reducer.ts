import {
    CLEAR_ALERT,
    CLEAR_VALUES,
    CREATE_COURT_BEGIN,
    CREATE_COURT_ERROR,
    CREATE_COURT_SUCCESS,
    DISPLAY_ALERT,
    GET_COURTS_BEGIN,
    GET_COURTS_SUCCESS,
    HANDLE_CHANGE,
    LOGOUT_USER,
    SETUP_USER_BEGIN,
    SETUP_USER_ERROR,
    SETUP_USER_SUCCESS,
    TOGGLE_SIDEBAR,
    UPDATE_USER_BEGIN,
    UPDATE_USER_ERROR,
    UPDATE_USER_SUCCESS
} from "./actions";
import {initialState} from "./appContext";

export default function reducer(state: any, action: {
    type: string; payload: {
        courts: any;
        user: any; token: any; location: any; alertText: any; msg: any;
    };
}) {
    if (action.type === DISPLAY_ALERT) {
        return {...state, showAlert: true, alertType: 'error', alertText: 'Please Provide all Values!'}
    }
    if (action.type === CLEAR_ALERT) {
        return {...state, showAlert: false, alertType: '', alertText: ''}
    }
    if (action.type === TOGGLE_SIDEBAR) {
        return {
            ...state,
            showSidebar: !state.showSidebar,
        }
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
    if (action.type === UPDATE_USER_BEGIN) {
        return {...state, isLoading: true}
    }
    if (action.type === UPDATE_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertType: 'success',
            alertText: 'User Profile Updated!',
        }
    }
    if (action.type === UPDATE_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'error',
            alertText: action.payload.msg,
        }
    }
    if (action.type === LOGOUT_USER) {
        return {
            ...initialState,
            user: null,
            token: null,
            jobLocation: '',
            userLocation: '',
        }
    }
    if (action.type === HANDLE_CHANGE) {

        return {
            ...state,
            // @ts-ignore
            [action.payload.name]: action.payload.value,
        }
    }
    if (action.type === CLEAR_VALUES) {
        const initialState = {
            editCourtId: '',
            courtName: '',
            courtType: 'tennis',
            inService: true,
        }
        return {...state, ...initialState}
    }
    if (action.type === CREATE_COURT_BEGIN) {
        return {...state, isLoading: true}
    }
    if (action.type === CREATE_COURT_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'New Court Created!',
        }
    }
    if (action.type === GET_COURTS_BEGIN) {
        return {...state, isLoading: true, showAlert: false}
    }
    if (action.type === GET_COURTS_SUCCESS) {
        // @ts-ignore
        return {
            ...state,
            isLoading: false,
            // @ts-ignore
            courts: action.payload.courts,
            // @ts-ignore
            totalCourts: action.payload.totalCourts,
            // @ts-ignore
            numOfPages: action.payload.numOfPages
        }
    }
    if (action.type === CREATE_COURT_ERROR) {
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