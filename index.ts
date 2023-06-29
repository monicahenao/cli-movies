#! /usr/bin/env node
import axios from "axios";

export const getMovie = async (movieName: string) => {
  try {
    const res = await axios.get(
      "http://www.omdbapi.com/?apikey=d0c583e1&t=" + movieName
    );

    if (res.data.Response === "False") {
      throw new Error("Movie not found");
    }

    const info = {
      Title: res.data.Title,
      YearOfRelease: res.data.Year,
      IMDBRating: res.data.imdbRating,
      RottenTomatoesRating: res.data.Ratings[1]?.Value,
      CountryOfProduction: res.data.Country,
      Language: res.data.Language,
      Plot: res.data.Plot,
      Actors: res.data.Actors,
    };

    return info;
  } catch (error) {
    console.log(error);

    throw new Error("Movie does not exist");
  }
};

require("yargs")
  .scriptName("mycli-movieName")
  .usage("$0 <cmd> [args]")
  .command(
    "get [movieName]",
    "Movie Information",
    (yargs: any) => {
      yargs.positional("movieName", {
        type: "string",
        default: "Cambi",
        describe: "View movie information to omdbapi",
      });
    },
    function (argv: any) {
      getMovie(argv.movieName)
        .then((val) => console.log(val))
        .catch((error) => console.error(error.message));
      // console.log('i', argv.movieName, 'information movie')
    }
  )
  .help().argv;
