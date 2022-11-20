import api from "./api"

export const getBalance = (setBalance: Function) => {
    api.get('transaction/balance')
    .then((response) => {
        setBalance(response.data.balance)
    })
    .catch((error) => {
        console.log(error)
    })
}