import { axiosInstance } from './axiosservice/StorageApiAxios'

export const fetchReceiptDocuments = async () => {
    const response = await axiosInstance.get('/receipts/getall')
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