export interface RequestParams {
    relativeURL: string;
    method: HTTPMethod;
    query?: any;
    body?: any;
    formData?: FormData;
    ignoreCache?: boolean;
    headers?: { [key: string]: string };
    timeout?: number;
}

export enum HTTPMethod {
    post = 'post',
    get = 'get',
    put = 'put',
    delete = 'delete'
}
