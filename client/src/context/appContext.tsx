import React, {useContext, useReducer} from 'react'
import {CLEAR_ALERT, DISPLAY_ALERT, SETUP_USER_BEGIN, SETUP_USER_ERROR, SETUP_USER_SUCCESS} from './actions'
import reducer from './reducer'
import axios from 'axios'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

export const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token,
    userLocation: userLocation || '',
    jobLocation: userLocation || '',
}

// @ts-ignore
const AppContext = React.createContext()

// @ts-ignore
export function AppProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState)

    const displayAlert = () => {
        // @ts-ignore
        dispatch({type: DISPLAY_ALERT})
        clearAlert()
    }
    const clearAlert = () => {
        setTimeout(() => {
            // @ts-ignore
            dispatch({type: CLEAR_ALERT})
        }, 3000)
    }

    // @ts-ignore
    const addUserToLocalStorage = ({user, token, location}) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        localStorage.setItem('location', location)
    }

    const removeUserToLocalStorage = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('location')
    }

    // @ts-ignore
    const setupUser = async ({currentUser, endPoint, alertText}) => {
        // @ts-ignore
        dispatch({type: SETUP_USER_BEGIN})
        try {
            const {data} = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)
            const {user, token, location} = data
            // @ts-ignore
            dispatch({type: SETUP_USER_SUCCESS, payload: {user, token, location, alertText}})
            addUserToLocalStorage({user, token, location})
        } catch (error) {
            // @ts-ignore
            dispatch({type: SETUP_USER_ERROR, payload: {msg: error.response.data.message}})
        }
        clearAlert()
    }


    return (
        <AppContext.Provider value={{...state, displayAlert, setupUser}}>
            {children}
        </AppContext.Provider>
    )
}

// Create hook
export function useAppContext() {
    return useContext(AppContext)
}
