import axios from 'axios'
import crypto from 'crypto'

export const momo_config = {
    'MOMO_ENDPOINT':'https://test-payment.momo.vn/v2/gateway/api/',
    'MOMO_PARTNER_CODE':'MOMOBKUN20180529',
    'MOMO_ACCESS_KEY':'klm05TvNBzhg7h7j',
    'MOMO_SECRET':'at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa',
    'MOMO_IPN_URL':'http://localhost:8080/api/order/paymentIPN'
}

const instance = axios.create({
    baseURL: momo_config.MOMO_ENDPOINT,
});

export const createPayment = async (orderID: string, orderInfo: string, amount: number, redirectUrl: string, requestType: 'payWithATM', extraData: string = "") => {
    const signatureData = {
        accessKey: momo_config.MOMO_ACCESS_KEY,
        amount,
        extraData,
        ipnUrl: momo_config.MOMO_IPN_URL,
        orderId: orderID,
        orderInfo,
        partnerCode: momo_config.MOMO_PARTNER_CODE,
        redirectUrl,
        requestId: orderID,
        requestType: requestType,
    }

    const signatureDataString = Object.keys(signatureData).reduce((result, key) => {
        return `${result}&${key}=${signatureData[key]}`
    }, '').slice(1)

    const signature = crypto.createHmac('sha256', momo_config.MOMO_SECRET).update(signatureDataString).digest('hex')

    const response = await instance.post('create', {
        ...signatureData,
        lang: 'vi',
        signature
    })

    return response.data
}
