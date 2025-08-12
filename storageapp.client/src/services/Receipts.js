import { axiosInstance } from './axiosservice/StorageApiAxios'
import qs from 'qs';

export const fetchReceiptDocuments = async (filter) => {
    const params = qs.stringify(filter, { arrayFormat: 'repeat' })
    const response = await axiosInstance.get(`/receipts/getall?${params}`)

    return response.data.receipts
}

export const createReceiptDocument = async (document) => {
    const responce = await axiosInstance.post('/receipts/create', {
        number: document?.number,
        date: document?.date,
        receiptResources: document?.receiptResources
    })

    return responce.data
}

export const updateReceiptDocument = async (document) => {
    const response = await axiosInstance.put('/receipts/update', {
        id: document?.id,
        number: document?.number,
        date: document?.date,
        receiptResources: document?.receiptResources
    })

    return response.data
}

export const deleteReceiptDocument = async (document) => {
    const response = await axiosInstance.delete('/receipts/delete', {
        params: {
            id: document?.id
        }
    })

    return response.data
}