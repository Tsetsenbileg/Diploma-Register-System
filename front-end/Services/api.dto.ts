import { AxiosRequestConfig } from "axios";

export type Prop = {
    config?: AxiosRequestConfig;
    body?: any;
    param?: string;
}