import { Prop } from "../api.dto";
import { axiosClient } from "../apiClient";

export const UploadService = ({ config, body }: Prop) => {
    return axiosClient.post("/upload", body, config);
}