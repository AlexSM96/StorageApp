import { axiosInstance } from './axiosservice/StorageApiAxios'

export const fetchMeasureUnits = async (filter) => {
    const response = await axiosInstance.get('/measureunits/getall', {
        params: {
            isArchive: filter?.isArchive
        }
    })

    return response.data.units
}

export const createMeasureUnits = async (unit) => {
    const responce = await axiosInstance.post('/measureunits/create', {
        name: unit?.name
    })

    return responce.data
}

export const updateMeasureUnits = async (unit) => {
    const response = await axiosInstance.put('/measureunits/update', {
        id: unit?.id,
        name: unit?.name
    })

    return response.data
}

export const archiveMeasureUnits = async (unit) => {
    const response = await axiosInstance.put('/measureunits/archive', {
        id: unit?.id,
        isArchive: unit?.isArchive
    })
    return response.data
}

export const deleteMeasureUnits = async (unit) => {
    const response = await axiosInstance.delete('/measureunits/delete', {
        params: {
            id: unit?.id
        }
    })

    return response.data
}