const express = require('express')
const axios = require('axios');

const app = express()
// 
const port = process.env.PORT || 3072

//app.set('views', './views')
//view engine
app.set('view engine', 'ejs')




// get mock data
const getMovies = (params) => {
    const page = params.page
    return axios.get(`
    https://api.themoviedb.org/3/movie/popular?api_key=213e41583c4a554ec1ba40e9f508db02&language=en-US&page=${page}`)
        .then(result => result.data)
}

// return [{
//     "id": 580489,
//     "poster_path": "/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg",
//     "title": "Venom: Let There Be Carnage",
// }, {
//     "id": 550988,
//     "poster_path": "/xmbU4JTUm8rsdtn7Y3Fcm30GpeT.jpg",
//     "title": "Free Guy",
// }, {
//     "id": 335983,
//     "poster_path": "/2uNW4WbgBXL25BAbXGLnLqX71Sw.jpg",
//     "title": "Venom",
// }, {
//     "id": 568620,
//     "poster_path": "/uIXF0sQGXOxQhbaEaKOi2VYlIL0.jpg",
//     "title": "Snake Eyes: G.I. Joe Origins",
// }, {
//     "adult": false,
//     "backdrop_path": "/3nv2TEz2u178xPXzdKlZdUh5uOI.jpg",
//     "belongs_to_collection": null,
//     "budget": 63000000,
//     "genres": [
//         {
//             "id": 18,
//             "name": "Drama"
//         }
//     ],
//     "homepage": "http://www.foxmovies.com/movies/fight-club",
//     "id": 550,
//     "imdb_id": "tt0137523",
//     "original_language": "en",
//     "original_title": "Fight Club",
//     "overview": "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
//     "popularity": 50.894,
//     "poster_path": "/a26cQPRhJPX6GbWfQbvZdrrp9j9.jpg",
//     "release_date": "1999-10-15",
//     "vote_average": 8.4,

// }]

// const totalPages = 500

app.get('/', (req, res) => {
    getMovies({ page: 1 }).then(data => {
        const movieList = data.results
        const pagination = [1, 2, 3, 10, 20, 30]
        res.render('index.ejs', { currentPage: 1, movieList, pagination })
    })
})

app.get('/all/:page', (req, res) => {
    const currentPage = parseInt(req.params.page, 10)
    getMovies({ page: currentPage }).then(data => {
        const movieList = data.results
        const totalPages = data.total_pages

        // fill pagination array with useful numbers
        let pagination = [
            1,
            currentPage - 1,
            currentPage,
            currentPage + 1,
            totalPages
            // remove all numbers out of range
        ].filter(n => n > 0 && n <= totalPages)

        // remove duplicates
        pagination = pagination.filter(
            (n, index) => pagination.indexOf(n) === index
        )
        res.render('index.ejs', { currentPage, pagination, movieList })
    })
})


const getDetails = (params) => {
    return axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=213e41583c4a554ec1ba40e9f508db02&language=en-US`)
        .then(result => result.data)
}

app.get('/:id', (req, res) => {
    getDetails({ page: currentPage }).then(data => {
        const movieDetail = data.results
        res.render('index.ejs', { currentPage, movieDetail })
    })
})

// app.get('/news', (req, res) => {
//     axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${process.env.API_KEYY}`)
//         .then(function (response) {
//             // handle success
//             console.log(response.data.articles);
//             res.render('news.ejs', { articles: response.data.articles })
//         })
//         .catch(function (error) {
//             // handle error
//             console.log(error);
//         })
// })

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})