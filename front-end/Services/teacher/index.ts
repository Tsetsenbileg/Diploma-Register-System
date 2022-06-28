import { Prop } from "../api.dto";
import { axiosClient } from "../apiClient";

export const CreateTeacherService = ({ config, body }: Prop) => {
    return (
        axiosClient.post("/teacher/create", body, config)
    )
}

export const GetAllTeachersService = ({ config }: Prop) => {
    return (
        axiosClient.get('/teacher/get-all', config)
    )
}