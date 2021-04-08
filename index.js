const express = require('express');

const fetch = require('node-fetch');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3010;

app.set('view engine', 'ejs');

app.listen(PORT, () => {
    console.log(`listening at: https://localhost:${PORT}`)
})

app.use(express.static('public'))

app.get('/', (req, res) => {
    fetch(`http://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
        .then(result => result.json())
        .then(data => {

            res.render('pages/index', { data, secret: process.env.SECRET })

        })


})
app.get('/:id', (req, res) => {
    fetch(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.API_KEY}&language=en-US`)
        .then(result => result.json())
        .then(data => {
            res.render('pages/overview', { data, secret: process.env.SECRET })
            console.log(data);
        })

})
