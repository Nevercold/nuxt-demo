
export default new class RequestService {
    async makeRequest<T>(url: string, httpMethod: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', request: any = {}, headers: any = {}): Promise<T> {
        try {
            let apiRequest: any = await $fetch.raw("/api" + url, {
                method: httpMethod,
                headers: {
                    ...headers,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: httpMethod != 'GET' ? JSON.stringify(request) : undefined,
                params: httpMethod == 'GET' ? request : {},
                ignoreResponseError: true

            });

            const statusCode = apiRequest.status ?? 200;

            if(statusCode > 500){
                throw {
                    message: "An error occurred while making the request ("+url+")",
                    response: apiRequest._data,
                    status_code: statusCode
                };
            }

            if(apiRequest.status == 204){
                return {} as T;
            }

            let {success, response} = await apiRequest._data;

            if (success) {
                return response as T;
            } else {
                console.log('error', response);
                throw {
                    message: "An error occurred while making the request",
                    response: response,
                    status_code: statusCode
                };
            }
        } catch (error) {
            console.log('error', error);
            throw error;
        }
    }
}