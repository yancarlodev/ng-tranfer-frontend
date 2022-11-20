import * as yup from 'yup'

export interface ICashOutData {
    username: string,
    value: string
}

export const cashOutSchema: yup.SchemaOf<ICashOutData> = yup.object().shape({
    username: yup.string().required('Username is required!'),
    value: yup.string().required('Value is required!')
})