import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { ILoginData, loginSchema } from "../../validators/sessionSchema";
import { yupResolver } from '@hookform/resolvers/yup'

export default function Form({ defaultValues, children, onSubmit, formSchema }: any): JSX.Element {
  const { register, handleSubmit, formState: { errors } } = useForm<ILoginData>({
        resolver: yupResolver(formSchema),
        defaultValues
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
      {React.Children.map(children, child => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register,
                errors,
                key: child.props.name
              }
            })
          : child
       })}
    </form>
  )
}