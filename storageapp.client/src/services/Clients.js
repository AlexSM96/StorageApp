import { axiosInstance } from './axiosservice/StorageApiAxios'


export const fetchClients = async (filter) => {
    const response = await axiosInstance.get('/clients/getall', {
        params: {
            isArchive: filter?.isArchive
        }
    })

    return response.data.clients
}

export const createClient = async (client) => {
    const responce = await axiosInstance.post('/clients/create', {
        name: client?.name,
        address: client?.address
    })

    return responce.data
}

export const updateClient = async (client) => {
    const response = await axiosInstance.put('/clients/update', {
        id: client?.id,
        name: client?.name,
        address: client?.address
    })

    return response.data
}

export const archiveClient = async (client) => {
    const response = await axiosInstance.put('/clients/archive', {
        id: client?.id,
        isArchive: client?.isArchive
    })
    return response.data
}

export const deleteClient = async (client) => {
    const response = await axiosInstance.delete('/clients/delete', {
        params: {
            id: client?.id
        }
    })

    return response.data
}