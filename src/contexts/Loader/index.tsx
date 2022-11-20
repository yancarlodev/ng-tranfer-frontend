import { createContext, ReactNode, useState } from "react"

interface IProps {
    children: ReactNode
}

interface ILoaderProvider {
    isLoading: boolean,
    setIsLoading: (state: boolean) => void,
    isLoadingBetweenPages: boolean,
    handleLoadingBetweenPagesStart: () => void,
    handleLoadingBetweenPagesStop: () => void
}

export const LoaderContext = createContext<ILoaderProvider>({} as ILoaderProvider)

const LoaderProvider = ({children}: IProps): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isLoadingBetweenPages, setIsLoadingBetweenPages] = useState<boolean>(false)

    const handleLoadingBetweenPagesStart = () => {
        setIsLoadingBetweenPages(true)       
    }

    const handleLoadingBetweenPagesStop = () => {
        setIsLoadingBetweenPages(false)
    }

    return(
        <LoaderContext.Provider value={{ isLoading, setIsLoading, isLoadingBetweenPages, handleLoadingBetweenPagesStart, handleLoadingBetweenPagesStop }}>
            {children}
        </LoaderContext.Provider>
    )
}

export default LoaderProvider