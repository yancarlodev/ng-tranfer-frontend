import { ReactNode } from "react"

interface IProps {
    children: ReactNode
}

const Button = ({children}: IProps): JSX.Element => {
    return(
        <button className="w-full py-4 border-r-[4px] border-b-[4px] border-l-[2px] border-t-[2px] border-buttonText bg-primaryColor rounded-lg text-headline font-semibold active:brightness-50">{children}</button>
    )
}

export default Button