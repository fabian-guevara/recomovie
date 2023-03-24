import axios from "axios";
import * as dotenv from 'dotenv';

dotenv.config();

class BaseController {

    constructor() {
        this.api_key = process.env.API_KEY;
    }

    get #apiQueryParam() {
        return `?api_key=${this.api_key}&`
    }

    #generateFullUrl(url, params) {
        const paramsHasLength = params.length;
        if(paramsHasLength) {
            return url + this.#apiQueryParam  + params.join("&");
        }
        return url + this.#apiQueryParam ;
    }

    async fire(url, params) {
        console.log(this.#generateFullUrl(url, params))
        return axios.get(this.#generateFullUrl(url, params));
    }

}


export default BaseController;