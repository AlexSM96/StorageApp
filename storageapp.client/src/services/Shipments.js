import { axiosInstance } from './axiosservice/StorageApiAxios'
import qs from 'qs';

export const fetchShipmentDocuments = async (filter) => {
    const params = qs.stringify(filter, { arrayFormat: 'repeat' })
    const response = await axiosInstance.get(`/shipments/getall?${params}`)
    return response.data.shipments
}

export const createShipmentDocument = async (document) => {
    const responce = await axiosInstance.post('/shipments/create', {
        number: document?.number,
        date: document?.date,
        clientId: document?.clientId,
        shipmentResources: document?.shipmentResources
    })

    return responce.data
}

export const updateShipmentDocument = async (document) => {
    const response = await axiosInstance.put('/shipments/update', {
        id: document?.id,
        number: document?.number,
        date: document?.date,
        clientId: document?.client?.id,
        shipmentResources: document?.shipmentResources
    })

    return response.data
}


export const signShipmentDocument = async (document) => {
    const response = await axiosInstance.delete('/shipments/sign', {
        params: {
            id: document.id
        }
    })
    return response.data
}

export const unSignShipmentDocument = async (document) => {
    const response = await axiosInstance.delete('/shipments/unsign', {
        params: {
            id: document.id
        }
    })
    return response.data
}

export const deleteShipmentDocument = async (document) => {
    const response = await axiosInstance.delete('/shipments/delete', {
        params: {
            id: document?.id
        }
    })

    return response.data
}