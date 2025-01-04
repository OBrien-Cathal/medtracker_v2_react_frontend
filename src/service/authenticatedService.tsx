import axios, {AxiosInstance} from 'axios';

class AuthenticatedService {
    private readonly _token: string = ""
    protected _client: AxiosInstance

    constructor(token: string, path: string) {
        this._token = token;
        this._client = this.createClient(path);
    }
    private getConfig(path: string) {
        return {
            baseURL: path,
            headers: {
                'Authorization': 'Bearer ' + this._token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
    }

    createClient(path: string): AxiosInstance {
        return this._client = axios.create(
            this.getConfig('http://192.168.1.162:3100/api/v1' + path)
        );
    }
}

export default AuthenticatedService