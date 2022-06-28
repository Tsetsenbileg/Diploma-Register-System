import { Prop } from "../api.dto";
import { axiosClient } from "../apiClient";

export const RegisterService = ({ config, body }: Prop) => {
    return axiosClient.post("/authentication/register", body, config);
}

export const UpdatePassword = ({ config, body }: Prop) => {
    return axiosClient.post("/users/change-password", body, config);
}

export const GetAdmins = ({ config }: Prop) => {
    return axiosClient.get("/users/admins", config);
}

export const GetAdminCount = ({ config }: Prop) => {
    return axiosClient.get("/users/admin-count", config);
}