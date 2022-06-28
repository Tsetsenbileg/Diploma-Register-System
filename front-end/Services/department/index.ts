import { Prop } from "../api.dto";
import { axiosClient } from "../apiClient";

export const CreateDepartmentService = ({ config, body }: Prop) => {
    return axiosClient.post("/department/create", body, config);
}

export const GetAllDepartmentsService = ({ config }: Prop) => {
    return axiosClient.get("/department/get-all", config);
}
