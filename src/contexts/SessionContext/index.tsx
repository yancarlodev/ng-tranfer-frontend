import { createContext, ReactNode, useContext, useState } from "react"
import api from "../../utils/api"
import { ILoginData, IRegisterData } from "../../validators/sessionSchema"
import { setCookies, deleteCookie } from 'cookies-next'
import { successToast } from "../../utils/successToast"
import { errorToast } from "../../utils/errorToast"
import { useRouter } from "next/router"
import { LoaderContext } from "../Loader"

export const SessionContext = createContext<ISessionContext>({} as ISessionContext)

interface ISessionContext {
    handleLogin: (userData: ILoginData) => void,
    handleRegister: (userData: IRegisterData) => void,
    handleLogout: () => void
}

interface IProps {
    children: ReactNode
}

const SessionProvider = ({children}: IProps): JSX.Element => {
    const { isLoading, setIsLoading } = useContext(LoaderContext)
    
    const router = useRouter()

    const handleLogin = (userData: ILoginData): void => {
        setIsLoading(true)

        api.post('/session/login', userData)
        .then((response) => {
            setCookies('token', response.data.token)
            successToast('Login done successfully!')
            router.push('/')
        })
        .catch((error) => {
            errorToast(`${error.response.data.message}!`)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    const handleRegister = (userData: IRegisterData): void => {
        delete userData.confirmPassword
        
        setIsLoading(true)

        api.post('/session/register', userData)
        .then((response) => {
            successToast('Register done successfully!')
            router.push('/login')
        })
        .catch((error) => {
            errorToast(`${error.response.data.message}!`)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    const handleLogout = (): void => {
        deleteCookie('token')
        router.push('/login')
    }

    return(
        <SessionContext.Provider value={{ handleLogin, handleRegister, handleLogout }}>
            {children}
        </SessionContext.Provider>
    )
}

export default SessionProvider