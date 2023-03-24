import BaseController from "./BaseController.js";

class GenreController extends BaseController{

    constructor() {
        super()
        this.data = [];
    }

    async #makeRequest(url, params = []) {
        // get only the desired part of the request
        const { data } = await this.fire(url, params);
        return data.genres;
     }   

    getAllGenres() {
        return this.#makeRequest('https://api.themoviedb.org/3/genre/movie/list', [])      
    }

    async parseDataForEnquirer() {
        const data = await this.getAllGenres();
        return data.map(({ name, id}) => {
            return { name, value: id }
        })
    }

}

export default GenreController;
