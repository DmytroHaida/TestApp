import axios, {AxiosError} from "axios"

export const SiteListHttp = {
    getSiteList: (): Promise<any> => {
        return axios.get('https://6389df1b4eccb986e89cf319.mockapi.io/external-verification/websites')
            .then(res => res.data)
    }
};
