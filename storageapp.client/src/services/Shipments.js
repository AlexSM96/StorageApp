import { axiosInstance } from './axiosservice/StorageApiAxios'

export const fetchShipmentDocuments = async () => {
    const response = await axiosInstance.get('/shipments/getall')
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

export const deleteShipmentDocument = async (document) => {
    const response = await axiosInstance.delete('/shipments/delete', {
        params: {
            id: document?.id
        }
    })

    return response.data
}