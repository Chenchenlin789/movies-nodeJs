const express = require('express')
const axios = require('axios');

const app = express()
// 
const port = process.env.PORT || 3072

//app.set('views', './views')
//view engine
app.set('view engine', 'ejs')

//home page
app.get('/', (req, res) => {
    res.redirect('/all/1')
})


// get mock data
const getMovies = (params) => {
    const page = params.page
    return axios.get(`
    https://api.themoviedb.org/3/movie/popular?api_key=213e41583c4a554ec1ba40e9f508db02&language=en-US&page=${page}`)
        .then(result => result.data)
}

// const totalPages = 500

app.get('/', (req, res) => {
    getMovies({ page: 1 }).then(data => {
        const movieList = data.results
        const pagination = [1, 2, 3, 10, 20, 30]
        res.render('pages/index.ejs', { currentPage: 1, movieList, pagination })
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
        res.render('pages/index.ejs', { currentPage, pagination, movieList })
    })
})


// app.get('/details/:id', (req, res) => {
//     axios.get(`
//     https://api.themoviedb.org/3/movie/${req.params.id}?api_key=213e41583c4a554ec1ba40e9f508db02&language=en-US
//     `)
//         .then(function (response) {
//             console.log(response);

//             res.render('pages/details', { movie: response.data })
//         })
//         .catch(function (error) {
//             console.log(error);
//         })


// })
const getDetails = (params) => {
    return axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=213e41583c4a554ec1ba40e9f508db02&language=en-US`)
        .then(result => result.data)
}

app.get('/details/:id', (req, res) => {
    // getDetails({ page: currentPage }).then(data => {
    //     // const movieDetail = data.results
    res.send(`it worked, the id is ${req.params.id}`)
    // })
})



app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})