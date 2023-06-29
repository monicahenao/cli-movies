import { getMovie } from "./index";
import axios, { Axios } from "axios";

jest.mock("axios", () => ({
  default: { get: jest.fn() },
  get: jest.fn(),
}));

describe("getMovie", () => {
  test("should return a movie information", async () => {
    const movieInformation = {
      data: {
        Response: 'some',
        Title: "Titanic",
        YearOfRelease: "1997",
        IMDBRating: "7.9",
        RottenTomatoesRating: "88%",
        CountryOfProduction: "United States, Mexico",
        Language: "English, Swedish, Italian, French",
        Plot: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
        Actors: "Leonardo DiCaprio, Kate Winslet, Billy Zane",
        Ratings: ['', {Value: 5}]
      }
    };
    (axios.get as any).mockReturnValue(Promise.resolve(movieInformation))
    const result = await getMovie('titanic'); 
    expect(axios.get).toHaveBeenCalledWith("http://www.omdbapi.com/?apikey=d0c583e1&t=titanic");
    expect(axios.get).not.toHaveBeenCalledWith("http://www.omdbapi.com/?apikey=d0c583e1&t");
  });

  test('should catch the error', async () => {
    try {
      const result = axios.get
    } catch (e){
      expect(e).toEqual(new Error("Movie does not exist"))
    };
    
    expect(axios.get).toHaveBeenCalledWith("http://www.omdbapi.com/?apikey=d0c583e1&t=titanic");
  })

});

