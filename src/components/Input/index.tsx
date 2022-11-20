import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import styles from '../../styles/Session.module.sass'

interface IProps {
    errors?: any,
    icon: JSX.Element,
    type?: string, 
    placeholder: string,
    register?: any,
    name: string,
    rest?: any
}

export function Input({ errors, icon, type = 'text', placeholder, register, name, ...rest }: IProps): JSX.Element {
    const [showPassword, setShowPassword] = useState<boolean>(false)

    return(
        <div>
            <label className="flex items-center outline outline-2 outline-boxColor gap-4 p-4 bg-inputBackground rounded-lg shadow-sm focus-within:outline focus-within:outline-primaryColor ease-in-out duration-150">
                {icon}
                <input className="bg-inputBackground text-primaryColor w-full outline-none placeholder:text-placeholderColor" placeholder={placeholder} type={showPassword && type === 'password' ? 'text' : type} {...register(name)} {...rest} />
                {
                    type === 'password' &&
                    <button type='button' onClick={() => setShowPassword(!showPassword)}>
                        {
                            showPassword ?
                            <FaRegEyeSlash className={styles.icon}/>
                                
                            :
                            <FaRegEye className={styles.icon}/>
                        }
                    </button>
                }
            </label>
            {
                errors &&
                <p className='text-headline2 text-negative p-1'>{errors[name]?.message}</p>
            }
        </div>
    )
}