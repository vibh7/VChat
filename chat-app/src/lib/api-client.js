import axios from "axios";
import { HOST } from "@/utils/Constant";

const apiClient = axios.create({
    baseURL : HOST
})

export default apiClient;