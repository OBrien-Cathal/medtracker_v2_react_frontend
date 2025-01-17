import axios from 'axios';


export default axios.create({
    baseURL: baseUrl(),
  });

export function baseUrl(): string {
    // let url = `${import.meta.env.VITE_API_URL}`;
    // console.log(url)
    // return url;
    return `${import.meta.env.VITE_API_URL}`;
}