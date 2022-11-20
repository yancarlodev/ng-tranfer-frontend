import Background from '../components/Background'
import Form from '../components/Form'
import { Input } from '../components/Input'
import SEO from '../components/SEO'
import SessionBox from '../components/SessionBox'
import styles from '../styles/Session.module.sass'
import { FaUser, FaLock } from 'react-icons/fa'
import Button from '../components/Button/index.tsx'
import { useContext, useEffect } from 'react'
import { SessionContext } from '../contexts/SessionContext'
import { registerSchema } from '../validators/sessionSchema'
import { useRouter } from 'next/router'
import { LoaderContext } from '../contexts/Loader'
import Loader from '../components/Loader'
import LoaderBetweenPages from '../components/LoaderBetweenPages'

const Register = () => {
    const { handleRegister } = useContext(SessionContext)
    const { handleLoadingBetweenPagesStart, handleLoadingBetweenPagesStop }  = useContext(LoaderContext)

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

    return(
        <div>
            <SEO title='Register' description="Do the right choice, join us!"/>

            <Background>
                <SessionBox title='Join us!' footer="Already have an account?" redirect="login">
                    <Form onSubmit={handleRegister} formSchema={registerSchema}>
                        <Input icon={<FaUser className={styles.icon}/>} name='username' placeholder='username'/>
                        <Input icon={<FaLock className={styles.icon}/>} name='password' placeholder='password' type='password'/>
                        <Input icon={<FaLock className={styles.icon}/>} name='confirmPassword' placeholder='confirm password' type='password'/>
                        
                        <Button>Register</Button>
                    </Form>
                </SessionBox>

                <Loader/>
                <LoaderBetweenPages/>
            </Background>
        </div>
    )
}

export default Register