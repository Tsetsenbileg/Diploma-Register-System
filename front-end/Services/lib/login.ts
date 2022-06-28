import { Prop } from "../api.dto";
import { axiosClient } from "../apiClient";

export const LoginService = ({ config, body }: Prop) => {
    return axiosClient.post("/login", body, config);
}