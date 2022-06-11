import {
    CLEAR_ALERT,
    CLEAR_COURT_VALUES,
    CLEAR_RESERVATION_VALUES,
    CREATE_COURT_BEGIN,
    CREATE_COURT_ERROR,
    CREATE_COURT_SUCCESS,
    CREATE_RESERVATION_BEGIN,
    CREATE_RESERVATION_ERROR,
    CREATE_RESERVATION_SUCCESS,
    DELETE_COURT_BEGIN,
    DELETE_RESERVATION_BEGIN,
    DISPLAY_ALERT,
    EDIT_COURT_BEGIN,
    EDIT_COURT_ERROR,
    EDIT_COURT_SUCCESS,
    EDIT_RESERVATION_BEGIN,
    EDIT_RESERVATION_ERROR,
    EDIT_RESERVATION_SUCCESS,
    GET_COURTS_BEGIN,
    GET_COURTS_SUCCESS,
    GET_RESERVATIONS_BEGIN,
    GET_RESERVATIONS_SUCCESS,
    GET_USERS_BEGIN,
    GET_USERS_ERROR,
    GET_USERS_SUCCESS,
    HANDLE_CHANGE,
    LOGOUT_USER,
    SET_EDIT_COURT,
    SET_EDIT_RESERVATION,
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
        userList: [];
        value: any;
        name: any;
        reservations: any;
        rCourtType: any;
        id: any;
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
            [action.payload.name]: action.payload.value,
        }
    }

    // COURT ACTIONS
    if (action.type === CLEAR_COURT_VALUES) {
        const initialState = {
            isEditing: false,
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
    if (action.type === CREATE_COURT_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'error',
            alertText: action.payload.msg
        }
    }
    if (action.type === GET_COURTS_BEGIN) {
        return {...state, isLoading: true, showAlert: false}
    }
    if (action.type === GET_COURTS_SUCCESS) {
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
    if (action.type === SET_EDIT_COURT) {
        const court = state.courts.find((court: any) => court.id === action.payload.id)
        const {id, courtName, courtType, inService} = court
        return {
            ...state,
            isEditing: true,
            editCourtId: id,
            courtName,
            courtType,
            inService
        }
    }
    if (action.type === EDIT_COURT_BEGIN) {
        return {...state, isLoading: true}
    }
    if (action.type === EDIT_COURT_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'Court Updated!'
        }
    }
    if (action.type === EDIT_COURT_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'error',
            alertText: action.payload.msg,
        }
    }
    if (action.type === DELETE_COURT_BEGIN) {
        return {...state, isLoading: true}
    }
    // RESERVATION ACTIONS
    if (action.type === CLEAR_RESERVATION_VALUES) {
        const initialState = {
            isEditing: false,
            editReservationId: '',
            courtId: '',
            date: new Date(),
            duration: 1,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            status: 'pending',
            reservationCourtType: ''
        }
        return {...state, ...initialState}
    }
    if (action.type === CREATE_RESERVATION_BEGIN) {
        return {...state, isLoading: true}
    }
    if (action.type === CREATE_RESERVATION_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'New Reservation Created!',
        }
    }
    if (action.type === CREATE_RESERVATION_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'error',
            alertText: action.payload.msg
        }
    }
    if (action.type === GET_RESERVATIONS_BEGIN) {
        return {...state, isLoading: true, showAlert: false}
    }
    if (action.type === GET_RESERVATIONS_SUCCESS) {

        return {
            ...state,
            isLoading: false,

            reservations: action.payload.reservations,
            // @ts-ignore
            totalReservations: action.payload.totalReservations,
            // @ts-ignore
            numOfPages: action.payload.numOfPages
        }
    }
    if (action.type === SET_EDIT_RESERVATION) {
        const reservation = state.reservations.find((reservation: any) => reservation.id === action.payload.id)
        const {id, courtId, date, duration, timezone, status} = reservation
        return {
            ...state,
            isEditing: true,
            editReservationId: id,
            courtId: courtId.id,
            date,
            duration,
            reservationCourtType: action.payload.rCourtType,
            status
        }
    }
    if (action.type === EDIT_RESERVATION_BEGIN) {
        return {...state, isLoading: true}
    }
    if (action.type === EDIT_RESERVATION_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'Reservation Updated!'
        }
    }
    if (action.type === EDIT_RESERVATION_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'error',
            alertText: action.payload.msg,
        }
    }
    if (action.type === DELETE_RESERVATION_BEGIN) {
        return {...state, isLoading: true}
    }

    if (action.type === GET_USERS_BEGIN) {
        return {...state, isLoading: true}
    }

    if (action.type === GET_USERS_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'error',
            alertText: action.payload.msg
        }
    }
    if (action.type === GET_USERS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            userList: action.payload.userList,
            // @ts-ignore
            totalUsers: action.payload.totalUsers,
            // @ts-ignore
            numOfPages: action.payload.numOfPages
        }
    }

    throw new Error(`no such action : ${action.type}`)
}