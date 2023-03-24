#!/usr/bin/env node
import {Select}  from "./helpers/logger.js";
import GenreController from "./controllers/GenreController.js";    
const currentYear = new Date().getFullYear();


const genreController =  new GenreController();

const genreArray = await genreController.parseDataForEnquirer();

const timePreferenceChoices = [
       { name: "Current Year", value: currentYear },
       { name: "Previous 5 years", value: currentYear - 5},
       {name: "All time", value: 0}
];

const getGenre = new Select({
    name: "genre",
    message: "What genre do you want to watch today?",
    choices: genreArray
})

const genre = await getGenre.run();


const genreId = genreArray.find((genre1) => genre1["name"] === genre).value;


const getTimePreference = new Select({
    name: "timePreference",
    message: `How old should the ${genre} movie be?`,
    choices: timePreferenceChoices
})


const timePreference = await getTimePreference.run();
const year = timePreferenceChoices.find(choice => choice.name === timePreference).value;

const getMoviesRec = async (genreId, page = 1, year) => {
    const response = await genreController.getMoviesWithFilter(genreId, page, year);
    const movies = response.map(movie => movie.title);
    const nextChoice = "Next Page";
    const getMovie = new Select({
        name: "movie",
        message: `Select a movie\n page #${page}`,
        choices: [...movies, nextChoice]
    })
    const movie = await getMovie.run();
    if(movie === nextChoice){
        getMoviesRec(genreId, page + 1, year)
    }
    else {
        return movie;
    }
}

const movie = await getMoviesRec(genreId, 1, year);

console.log(movie);