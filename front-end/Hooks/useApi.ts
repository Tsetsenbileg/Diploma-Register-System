import { AxiosRequestConfig } from "axios";
import { useState, useRef } from "react";
// import { useUser } from "../Context/loginContext"
import { useUser } from "../Context/user"
type Prop = {
    service: Function;
    config?: AxiosRequestConfig;
    param?: string;
}
type ConfigProp = {
    myConfig?: AxiosRequestConfig;
    token: string | undefined;
}

const buildConfig = ({ myConfig, token }: ConfigProp) => {

    return {
        ...myConfig,
        headers: {
            ...myConfig?.headers,
            Authorization: `Bearer ${token}`
        }
    }
}

export function UseApi({ service, config: myConfig, param }: Prop) {

    const [data, setData] = useState<null | any>(null);
    const [error, setError] = useState<null | any>(null);
    const [isLoading, setLoading] = useState<null | any>(null);

    const { getAccessToken } = useUser()

    const fetch = useRef(async (body: any) => {
        setData(null);
        setError(null);
        try {
            setLoading(true);
            const token = getAccessToken();
            const config = buildConfig({ myConfig, token });
            const res = await service({ config, body, param });
            setData(res);
            setLoading(false);
        } catch (err: any) {
            console.log(err, "useApiError");
            setLoading(false);
            setError(err);
        }
    })

    return [{ data, isLoading, error }, fetch.current] as const;
}