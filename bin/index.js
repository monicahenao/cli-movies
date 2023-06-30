#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMovie = void 0;
const axios_1 = __importDefault(require("axios"));
const getMovie = (movieName) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const res = yield axios_1.default.get("http://www.omdbapi.com/?apikey=d0c583e1&t=" + movieName);
        const info = {
            Title: res.data.Title,
            YearOfRelease: res.data.Year,
            IMDBRating: res.data.imdbRating,
            RottenTomatoesRating: (_a = res.data.Ratings[1]) === null || _a === void 0 ? void 0 : _a.Value,
            CountryOfProduction: res.data.Country,
            Language: res.data.Language,
            Plot: res.data.Plot,
            Actors: res.data.Actors,
        };
        return info;
    }
    catch (error) {
        throw new Error("Movie does not exist");
    }
});
exports.getMovie = getMovie;
require("yargs")
    .scriptName("mycli-movieName")
    .usage("$0 <cmd> [args]")
    .command("get [movieName]", "Movie Information", (yargs) => {
    yargs.positional("movieName", {
        type: "string",
        default: "Cambi",
        describe: "View movie information to omdbapi",
    });
}, function (argv) {
    (0, exports.getMovie)(argv.movieName)
        .then((val) => console.log(val))
        .catch((error) => console.error(error.message));
})
    .help().argv;
//# sourceMappingURL=index.js.map