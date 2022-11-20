import { ReactNode } from "react"

interface IProps {
    children: ReactNode
}

const Balance = ({children}: IProps): JSX.Element => {
    return(
        <button className="py-6 px-16 cursor-default border-r-[4px] border-b-[4px] border-l-[2px] border-t-[2px] border-buttonText bg-primaryColor rounded-lg text-title2 font-semibold active:brightness-50">{children}</button>
    )
}

export default Balance