import React, {useContext, useReducer} from 'react'
import {
    CLEAR_ALERT,
    DISPLAY_ALERT,
    LOGOUT_USER,
    SETUP_USER_BEGIN,
    SETUP_USER_ERROR,
    SETUP_USER_SUCCESS,
    UPDATE_USER_BEGIN,
    UPDATE_USER_ERROR,
    UPDATE_USER_SUCCESS
} from './actions'
import reducer from './reducer'
import axios from 'axios'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

export const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token
}

// @ts-ignore
const AppContext = React.createContext()

// @ts-ignore
export function AppProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState)

    // axios
    const authFetch = axios.create({
        baseURL: '/api/v1',
    })
    // request

    authFetch.interceptors.request.use(
        (config) => {
            // @ts-ignore
            config.headers.common['Authorization'] = `Bearer ${state.token}`
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )
    // response

    authFetch.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            // console.log(error.response)
            if (error.response.status === 401) {
                logoutUser()
            }
            return Promise.reject(error)
        }
    )


    const displayAlert = () => {
        // @ts-ignore
        dispatch({type: DISPLAY_ALERT})
        clearAlert()
    }
    const clearAlert = () => {
        setTimeout(() => {
            // @ts-ignore
            dispatch({type: CLEAR_ALERT})
        }, 5000)
    }

    // @ts-ignore
    const addUserToLocalStorage = ({user, token}) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    // @ts-ignore
    const setupUser = async ({currentUser, endPoint, alertText}) => {
        // @ts-ignore
        dispatch({type: SETUP_USER_BEGIN})
        try {
            const {data} = await axios.post(`/api/v1/${endPoint}`, currentUser)
            const {user, token} = data
            // @ts-ignore
            dispatch({type: SETUP_USER_SUCCESS, payload: {user, token, alertText}})
            addUserToLocalStorage({user, token})
        } catch (error) {
            // @ts-ignore
            dispatch({type: SETUP_USER_ERROR, payload: {msg: error.response.data.message}})
        }
        clearAlert()
    }

    // @ts-ignore
    const updateUser = async ({currentUser, endPoint, alertText}) => {
        // @ts-ignore
        dispatch({type: UPDATE_USER_BEGIN})
        try {
            const {data} = await authFetch.patch(`${endPoint}`, currentUser)
            const {user, token} = data
            // @ts-ignore
            dispatch({type: UPDATE_USER_SUCCESS, payload: {user, token, alertText}})
            addUserToLocalStorage({user, token})
        } catch (error) {
            // @ts-ignore
            dispatch({type: UPDATE_USER_ERROR, payload: {msg: error.response.data.message}})
        }
        clearAlert()
    }

    const logoutUser = () => {
        // @ts-ignore
        dispatch({type: LOGOUT_USER})
        removeUserFromLocalStorage()
    }

    return (
        <AppContext.Provider value={{...state, displayAlert, setupUser, updateUser, logoutUser}}>
            {children}
        </AppContext.Provider>
    )
}

// Create hook
export function useAppContext() {
    return useContext(AppContext)
}
