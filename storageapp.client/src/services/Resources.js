import { axiosInstance } from './axiosservice/StorageApiAxios'

export const fetchResources = async (filter) => {
    const response = await axiosInstance.get('/resources/getall', {
        params: {
            isArchive: filter?.isArchive
        }
    })

    return response.data.resources
}

export const createResource = async (resource) => {
    const responce = await axiosInstance.post('/resources/create', {
        name: resource?.name
    })

    return responce.data
}


export const updateResource = async (resource) => {
    const response = await axiosInstance.put('/resources/update', {
        id: resource?.id,
        name: resource?.name
    })

    return response.data
}

export const archiveResource = async (resource) => {
    const response = await axiosInstance.put('/resources/archive', {
        id: resource?.id,
        isArchive: resource?.isArchive
    })
    return response.data
}

export const deleteResource = async (resource) => {
    const response = await axiosInstance.delete('/resources/delete', { params: { id: resource?.id } } )
    return response.data
}