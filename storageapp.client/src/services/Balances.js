import { axiosInstance } from './axiosservice/StorageApiAxios'
import qs from 'qs';

export const fetchBalances = async (filter) => {
    const params = qs.stringify(filter, { arrayFormat: 'repeat' })
    const response = await axiosInstance.get(`/balances/getall?${params}`)

    return response.data.balance
}