import { axiosInstance } from './axiosservice/StorageApiAxios'

export const fetchBalances = async (filter) => {
    const response = await axiosInstance.get('/balances/getall', {
        params: {
            resourceIds: filter?.resourceIds,
            measureUnitIds: filter?.measureUnitIds
        }
    })

    return response.data.balance
}