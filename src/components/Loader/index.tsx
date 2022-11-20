import { useContext } from "react"
import { SessionContext } from "../../contexts/SessionContext"

const Loader = (): JSX.Element => {
    const { isLoading } = useContext(SessionContext)
    
    return(
        <>
            {
                isLoading &&
                    <div className="flex justify-center items-center w-full h-full fixed bg-[#00000099]">
                        <div className="w-[50px] h-[50px] rounded-full border-4 border-boxColor border-t-primaryColor animate-spin"></div>
                    </div>
            }
        </>
    )
}

export default Loader