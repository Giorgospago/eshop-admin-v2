export interface IResponse {
    success: boolean;
    errors?: any[];
    message?: string;
    [key: string]: any;
}
