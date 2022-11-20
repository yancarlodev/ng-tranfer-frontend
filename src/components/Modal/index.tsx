import { IoMdClose } from 'react-icons/io'
import Form from '../Form'
import { Input } from '../Input'
import styles from '../../styles/Session.module.sass'
import { FaUser, FaDollarSign } from 'react-icons/fa'
import Button from '../Button/index.tsx'
import { cashOutSchema, ICashOutData } from '../../validators/transactionSchema'
import { createRef, SetStateAction, useContext, useEffect } from 'react'
import { ModalContext } from '../../contexts/ModalContext'
import { LoaderContext } from '../../contexts/Loader'
import api from '../../utils/api'
import { errorToast } from '../../utils/errorToast'
import { successToast } from '../../utils/successToast'
import { ITransaction } from '../../pages'
import { getBalance } from '../../utils/getBalance'
import { getTransactions } from '../../utils/getTransactions'

interface IProps { 
    setTransactionList: (state: ITransaction[]) => void,
    setBalance: (state: string) => void,
    isCashOutOnly: boolean, 
    isCashInOnly: boolean, 
    isOrderedByTime: boolean
}

const Modal = ({setTransactionList, setBalance, isCashOutOnly, isCashInOnly, isOrderedByTime}: IProps) => {
    const modalRef = createRef<HTMLDivElement>()
    const { setIsModalOpen } = useContext(ModalContext)
    const { setIsLoading } = useContext(LoaderContext)

    useEffect(() => {
        const handleOnClick = (event: MouseEvent) => {
            if(!modalRef.current?.contains(event.target as Element)) {
                setIsModalOpen(false)
            }
        }

        document.addEventListener('mousedown', handleOnClick)

        return () => {
            document.removeEventListener('mousedown', handleOnClick)
        }
    }, [])

    const handleCashOut = (cashOutData: ICashOutData): void => {
        setIsLoading(true)
        
        const formattedCashOutData = {
            ...cashOutData,
            value: cashOutData.value.replace(',', '.')
        }

        api.post('/transaction/cash-out', formattedCashOutData)
        .then((response) => {
            setIsModalOpen(false)
            successToast(response.data.message)

            getTransactions(setTransactionList, isCashOutOnly, isCashInOnly, isOrderedByTime)

            getBalance(setBalance)
        })
        .catch((error) => {
            errorToast(`${error?.response?.data?.message}!` || 'Something goes wrong, please try again!')
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    return(
        <div className="flex justify-center items-center w-full h-screen fixed top-0 bg-[#00000070]">
            <section ref={modalRef} className="flex flex-col gap-6 w-full h-screen justify-center sm:w-[425px] sm:h-max bg-boxColor sm:rounded-3xl py-12 px-10">
                <div className='flex justify-between'>
                    <h2 className='text-title2 text-primaryColor font-bold'>Do a cash-out</h2>

                    <button onClick={() => setIsModalOpen(false)}><IoMdClose color='white' size={25}/></button>
                </div>

                <Form onSubmit={handleCashOut} formSchema={cashOutSchema}>
                    <Input icon={<FaUser className={styles.icon}/>} name='username' placeholder='username'/>
                    <Input icon={<FaDollarSign className={styles.icon}/>} name='value' placeholder='value'/>

                    <Button>Send</Button>
                </Form>
            </section>
        </div>
    )
}

export default Modal