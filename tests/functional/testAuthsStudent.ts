import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";

export async function getTokenAuthotization():Promise<string>{
    let endpoint = "/api/v1/login"
    let body = {
        email: "student2@correo.co,",
        password:"12345"
    }
    let axiosResponse = await axios.post(`${Env.get("PATH_APP") + endpoint}`, body)
    return axiosResponse.data["token"]
}

