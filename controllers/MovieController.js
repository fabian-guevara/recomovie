import BaseController from "./BaseController.js";

class MovieController extends BaseController {
    constructor() {
        super();
    }
    async getMoviesWithFilter(id, page = 1, year) {
        const params = [`with_genres=${id}`, `page=${page}`, `year=${year}`];
        const response = await this.fire(`https://api.themoviedb.org/3/discover/movie`, params);
        return response.data.results
    }

    async getMovieByTitle(title){
        const queryTitle = title.replaceAll(" ", "+");
        const params = [`query=${queryTitle}`];
        const response = await this.fire("https://api.themoviedb.org/3/search/movie", params);
        return response.data.results[0];
    }
}


export default MovieController;