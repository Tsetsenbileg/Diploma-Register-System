import { Prop } from "../api.dto";
import { axiosClient } from "../apiClient";

export const CreateDiplomaService = ({ config, body }: Prop) => {
    return axiosClient.post("/diploma/create", body, config);
}

export const DiplomaCountService = ({ config }: Prop) => {
    return axiosClient.get("/diploma/count", config);
}

export const DiplomaListService = ({ config }: Prop) => {

    return axiosClient.get("/diploma-date", config);

}

export const SearchDiplomaService = ({ config, body }: Prop) => {

    return axiosClient.post("/search", body, config);

}

export const SortedDiplomaService = ({ config, body }: Prop) => {
    return axiosClient.get("/sorted", config);
}
// export const DiplomaService = ({config}: Prop) => {

//     return axiosClient.get("/diploma")
// }
