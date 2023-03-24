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

    async getMoviesWithFilter(id, page = 1, year) {
        
        const params = [`with_genres=${id}`, `page=${page}`, `year=${year}`];
        const response = await this.fire(`https://api.themoviedb.org/3/discover/movie`, params);
        return response.data.results
    }

}

export default GenreController;
