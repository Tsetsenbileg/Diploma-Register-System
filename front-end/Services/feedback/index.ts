import { Prop } from "../api.dto"
import { axiosClient } from "../apiClient"

export const SubmitFeedbackService = ({ config, body }: Prop) => {

    return axiosClient.post("/feedback/create", body, config);
}

export const GetFeedbacksService = ({ config }: Prop) => {

    return axiosClient.get("/feedback/get-all", config);
}