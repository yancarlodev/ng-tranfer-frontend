import { getCookie } from 'cookies-next'
import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import styles from '../styles/Dashboard.module.sass'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { LoaderContext } from '../contexts/Loader'
import SEO from '../components/SEO'
import Image from 'next/image'
import SmallButton from '../components/SmallButton'
import { SessionContext } from '../contexts/SessionContext'
import { FaArrowDown, FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import Balance from '../components/Balance/index.tsx'
import api from '../utils/api'
import TransactionCard from '../components/TransactionCard'
import Modal from '../components/Modal'
import { ModalContext } from '../contexts/ModalContext'
import { getBalance } from '../utils/getBalance'
import { getTransactions } from '../utils/getTransactions'

interface IProps {
    accountId: string,
    username: string
}

export interface ITransaction {
    id: string,
    debitedAccountId: string,
    creditedAccountId: string,
    value: string,
    createdAt: string,
    creditedAccount: {
        user: {
            username: string
        }
    },
    debitedAccount: {
        user: {
            username: string
        }
    }
}

const Dashboard = ({ accountId, username }: IProps): JSX.Element => {
    const [isBalanceShowing, setIsBalanceShowing] = useState<boolean>(true)
    const [isCashOutOnly, setIsCashOutOnly] = useState<boolean>(false)
    const [isCashInOnly, setIsCashInOnly] = useState<boolean>(false)
    const [isOrderedByTime, setIsOrderedByTime] = useState<boolean>(false)
    const [balance, setBalance] = useState<string>('0.0')
    const [transactionList, setTransactionList] = useState<ITransaction[]>([])
    const { handleLogout } = useContext(SessionContext)
    const { handleLoadingBetweenPagesStart, handleLoadingBetweenPagesStop }  = useContext(LoaderContext)
    const { isModalOpen, setIsModalOpen } = useContext(ModalContext)
    
    const token = getCookie('token')
    api.defaults.headers.common['Authorization'] = `Bearer ${token}` 
    
    useEffect(() => {
        getBalance(setBalance)
    }, [])

    useEffect(() => {
        getTransactions(setTransactionList, isCashOutOnly, isCashInOnly, isOrderedByTime)
    }, [isCashOutOnly, isCashInOnly, isOrderedByTime])

    const router = useRouter()

    useEffect(() => {
        router.events.on('routeChangeStart', handleLoadingBetweenPagesStart)
        router.events.on('routeChangeComplete', handleLoadingBetweenPagesStop)
        router.events.on('routeChangeError', handleLoadingBetweenPagesStop)

        return () => {
            router.events.off('routeChangeStart', handleLoadingBetweenPagesStart)
            router.events.off('routeChangeComplete', handleLoadingBetweenPagesStop)
            router.events.off('routeChangeError', handleLoadingBetweenPagesStop)
        }
    }, [router])

    const handleFilterAll = () => {
        setIsCashOutOnly(false)
        setIsCashInOnly(false)
    }

    const handleFilterCashOutOnly = () => {
        setIsCashOutOnly(true)
        setIsCashInOnly(false)
    }
    
    const handleFilterCashInOnly = () => {
        setIsCashOutOnly(false)
        setIsCashInOnly(true)
    }

    return (
        <div>
            <SEO title='Dashboard' description='The place to find financial peace!'/>

            <div className={styles.container}>
                <header className={styles.header}>
                    <div className={styles.wrapper}>
                        <Image src='./NgcashLogo.svg' alt='NG.Cash logo' width={105} height={68}/>
                        <SmallButton onClick={handleLogout}>Logout</SmallButton>
                    </div>
                </header>

                <main className={styles.main}>
                    <section className={styles.board}>
                        <div className={styles.wrapper}>
                            <h2 className={styles.greetings}>Hi, {username}!</h2>

                            <section className={styles.balanceContainer}>
                                <SmallButton onClick={() => {setIsBalanceShowing(!isBalanceShowing)}}>
                                    {
                                        isBalanceShowing ?
                                            <FaRegEyeSlash size={25}/>
                                        :
                                            <FaRegEye size={25}/>
                                    }
                                </SmallButton>
                                
                                <Balance>
                                    {
                                        isBalanceShowing ?
                                            new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(balance))
                                        :
                                            'Hidden'
                                    }
                                </Balance>
                            </section>
                        </div>
                    </section>

                    <section className={styles.transactionWrapper}>
                        <div className={styles.filterContainer}>
                            <h3 className={styles.listName}>Transaction</h3>

                            <nav>
                                <ul className={styles.filterList}>
                                    <li>
                                        <SmallButton onClick={() => handleFilterAll()}>All</SmallButton>
                                    </li>
                                    <li>
                                        <SmallButton onClick={() => handleFilterCashOutOnly()}>Cash-outs</SmallButton>
                                    </li>
                                    <li>
                                        <SmallButton onClick={() => handleFilterCashInOnly()}>Cash-ins</SmallButton>
                                    </li>
                                    <li className='flex items-center'>
                                        <button onClick={() => setIsOrderedByTime(!isOrderedByTime)}>
                                            <FaArrowDown className={`ease-in-out duration-150 ${isOrderedByTime && styles.rotateArrow}`} size={24} color='white'/>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <ul className={styles.transactionList}>
                            <li>
                                <button className={styles.newTransactionButton} onClick={() => setIsModalOpen(true)}>New transaction</button>
                            </li>
                            {
                                transactionList.map(transaction => 
                                    <TransactionCard key={transaction.id} accountId={accountId} transaction={transaction}/>
                                )
                            }
                        </ul>
                    </section>
                </main>
                
                {
                    isModalOpen && <Modal setTransactionList={setTransactionList} setBalance={setBalance} isCashOutOnly={isCashOutOnly} isCashInOnly={isCashInOnly} isOrderedByTime={isOrderedByTime}/>
                }
            </div>
        </div>
    )
}

export default Dashboard

interface IServerSideContext {
    req: NextApiRequest,
    res: NextApiResponse
}

export const getServerSideProps = ({ req, res }: IServerSideContext) => {
    const token = getCookie('token', { req, res })
    let userId: string | undefined = undefined
    let username: string | undefined = undefined
    let accountId: string | undefined = undefined
    
    jwt.verify(token as string, process.env.SECRET_KEY as string, (error: jwt.VerifyErrors | null, decoded: any) => {
        if(error) return null

        userId = decoded.sub
        username = decoded.username
        accountId = decoded.accountId
    })

    if(!userId || !username || !accountId) {
        return {
            redirect: {
                permanent: false,
                destination: '/login'
            }
        }
    }

    return {
        props: {
            userId,
            accountId,
            username
        }
    }
}

