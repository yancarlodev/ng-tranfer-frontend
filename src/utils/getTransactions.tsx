import api from "./api"

export const getTransactions = (setTransactionList: Function, cashOutOnly?: boolean, cashInOnly?: boolean, orderByTime?: boolean) => {
    const URLBuilded = `/transaction/?${cashOutOnly ? 'cash-outs-only' : ''}${cashInOnly ? 'cash-ins-only' : ''}${orderByTime ? '&order-by-time' : ''}`
    
    api.get(URLBuilded)
    .then((response) => {
        setTransactionList(response.data)
    })
    .catch((error) => {
        console.log(error)
    })
}