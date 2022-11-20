import { ReactNode } from "react"

interface IProps {
    children: ReactNode,
    onClick: () => void
}

const SmallButton = ({children, onClick}: IProps): JSX.Element => {
    return(
        <button onClick={onClick} className="w-max p-1 border-r-[4px] border-b-[4px] border-l-[2px] border-t-[2px] border-buttonText bg-primaryColor rounded-lg text-headline font-semibold active:brightness-50">
            {children}
        </button>
    )
}

export default SmallButton