import axios from 'axios';


export default axios.create({
    baseURL: baseUrl(),
  });

export function baseUrl(): string {

    // console.log(envURL.toString())
    //
    // let stringURL = 'http://localhost:8080/api/v1';
    // console.log(stringURL)
    return `${import.meta.env.VITE_API_URL}`;}