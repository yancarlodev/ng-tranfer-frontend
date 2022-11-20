import Background from '../components/Background'
import Form from '../components/Form'
import { Input } from '../components/Input'
import SEO from '../components/SEO'
import SessionBox from '../components/SessionBox'
import styles from '../styles/Session.module.sass'
import { FaUser, FaLock } from 'react-icons/fa'
import Button from '../components/Button/index.tsx'
import { SessionContext } from '../contexts/SessionContext'
import { useContext } from 'react'
import { loginSchema } from '../validators/sessionSchema'
import Loader from '../components/Loader'

const Login = () => {
    const { handleLogin } = useContext(SessionContext)

    return(
        <div>
            <SEO title='Login' description="Let's transform the financial lives of young people together!"/>

            <Background>
                <SessionBox title='The new generation wallet!' footer="Don't have an account?" redirect="register">
                    <Form onSubmit={handleLogin} formSchema={loginSchema}>
                        <Input icon={<FaUser className={styles.icon}/>} name='username' placeholder='username'/>

                        <Input icon={<FaLock className={styles.icon}/>} name='password' placeholder='password' type='password'/>
        
                        <Button>Login</Button>
                    </Form>
                </SessionBox>

                <Loader/>
            </Background>
        </div>
    )
}

export default Login