import { ITransaction } from '../../pages'
import styles from '../../styles/Dashboard.module.sass'

interface IProps {
    accountId: string,
    transaction: ITransaction
}

const TransactionCard = ({ accountId, transaction }: IProps) => {
    const { debitedAccountId, debitedAccount, creditedAccount, createdAt, value }: ITransaction = transaction
    const createdAtFormatted = String(new Date(createdAt)).split(' ').slice(1, 3).reverse().join(' ')

    return(
        <li className={styles.transactionCard}>
            <div className={styles.transactionInfo}>
                <h4 className={styles.transactionType}>{ debitedAccountId === accountId ? 'Cash-out' : 'Cash-in' }</h4>
                
                <p className={styles.transactionText}>{createdAtFormatted}</p>
            </div>

            <div className={styles.transactionInfo}>
                <h3 className={styles.transactionText}>{ debitedAccountId === accountId ? creditedAccount.user.username : debitedAccount.user.username }</h3>
                
                <p className={debitedAccountId === accountId ? styles.transactionValueNegative : styles.transactionValuePositive }>
                    {
                        debitedAccountId === accountId ? '- ' : '+ ' 
                    } 
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value))}
                </p>
            </div>
        </li>
    )
}

export default TransactionCard