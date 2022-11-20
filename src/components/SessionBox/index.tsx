import styles from '../../styles/Session.module.sass'
import { ReactNode } from "react"
import Link from 'next/link'

interface IProps {
    children: ReactNode,
    title: string,
    footer: string,
    redirect: string
}

const SessionBox = ({children, title, footer, redirect}: IProps): JSX.Element => {
    return(
        <section className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        
        {children}

        <p className={styles.footer}>{footer} <Link className={styles.link} href={`/${redirect}`}>{redirect}!</Link></p>
        </section>
    )
}

export default SessionBox