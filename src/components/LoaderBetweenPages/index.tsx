import { useContext } from "react"
import { LoaderContext } from "../../contexts/Loader"

const LoaderBetweenPages = (): JSX.Element => {
    const { isLoadingBetweenPages } = useContext(LoaderContext)
    
    return(
        <>
            {
                isLoadingBetweenPages &&
                    <div className="flex justify-center items-center w-full h-full fixed bg-backgroundColor">
                        <div className="w-[50px] h-[50px] rounded-full border-4 border-boxColor border-t-primaryColor animate-spin"></div>
                    </div>
            }
        </>
    )
}

export default LoaderBetweenPages