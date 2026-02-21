import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiGet, apiPost, apiPut, apiDelete } from '../../Api/axiosApiConfig';

export const useApiGet = (path, params, queryKey) => {
    const queryFn = () => apiGet(path, params);
    return useQuery({
        queryKey,
        queryFn,
        enabled: !!(path)
    });
}

export const useApiPost = (queryKey, onSuccessFn = () => { }, useReturnedDataOnSuccessFn = false, onErrorFn = () => { }) => {
    const queryClient = useQueryClient();
    const mutationFn = (sentData) => apiPost(sentData.path, sentData.data, sentData.params);
    return useMutation({
        mutationFn,
        onSuccess: (returnedData, sentData) => {
            queryClient.invalidateQueries({ queryKey });
            onSuccessFn(returnedData, sentData);
        },
        onError: (error) => {
            console.error("Error authenticating :: ", error);
            onErrorFn();
        }
    })
}

export const useApiPut = (queryKey, onSuccessFn = () => { }, onErrorFn = () => { }) => {
    const queryClient = useQueryClient();
    const mutationFn = (sentData) => apiPut(sentData.path, sentData.data, sentData.params);
    return useMutation({
        mutationFn,
        onSuccess: (returnedData, sentData) => {
            queryClient.invalidateQueries({ queryKey });
            onSuccessFn(returnedData, sentData);
        },
        onError: (error) => {
            console.error("Error authenticating :: ", error);
            onErrorFn();
        }
    })
}

export const useApiDelete = (queryKey, onSuccessFn = () => { }, onErrorFn = () => { }) => {
    const queryClient = useQueryClient();
    const mutationFn = (data) => apiDelete(data.path, data.data, data.params);
    return useMutation({
        mutationFn,
        onSuccess: (returnedData, sentData) => {
            queryClient.invalidateQueries({ queryKey });
            onSuccessFn(returnedData, sentData);
        },
        onError: (error) => {
            console.error("Error authenticating :: ", error);
            onErrorFn();
        }
    })
}