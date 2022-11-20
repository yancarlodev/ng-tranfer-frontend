import { ReactNode } from "react"

interface IProps {
    children: ReactNode
}

const Background = ({children}: IProps): JSX.Element => {
    return(
        <div className="flex justify-center items-center w-full h-screen bg-backgroundColor">
            {children}
        </div>
    )
}

export default Background