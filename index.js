const PORT = 8000
const express = require('express')
const axios = require('axios')
const chreerio = require('cheerio')

const app = express()

app.get('/', (req, res) => {
    res.json('Welcome to my CryptoNews Api')
})

app.get('/news', (req, res) => {
    axios.get('https://cointelegraph.com/')
    .then((response) => {
        const html = response.data
        console.log(html)
    })
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
