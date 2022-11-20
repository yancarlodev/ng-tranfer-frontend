import { useContext } from "react"
import { LoaderContext } from "../../contexts/Loader"

const Loader = (): JSX.Element => {
    const { isLoading } = useContext(LoaderContext)
    
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