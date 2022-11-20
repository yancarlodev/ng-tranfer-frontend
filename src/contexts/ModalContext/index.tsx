import { createContext, ReactNode, useState } from "react"


interface IModalContext {
    isModalOpen: boolean,
    setIsModalOpen: (state: boolean) => void
}

interface IProps {
    children: ReactNode
}

export const ModalContext = createContext<IModalContext>({} as IModalContext)

const ModalProvider = ({children}: IProps): JSX.Element => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    return(
        <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
            {children}
        </ModalContext.Provider>
    )
}

export default ModalProvider