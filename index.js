const PORT = 8000
const express = require('express')
const axios = require('axios')
const chreerio = require('cheerio')

const app = express()


const newinfo = [
    {
        name: 'cointhelegraph',
        address:'https://cointelegraph.com/'
    
    },
    {
        name: 'crypto-bloomberg',
        address:'https://www.bloomberg.com/crypto'
    },
    {
        name:'cryptonew',
        address:'https://cryptonews.net/'
    }
]


const articles = []


newinfo.forEach(newinfo => {

    
})


app.get('/', (req, res) => {
    res.json('Welcome to my CryptoNews Api')
})

app.get('/news', (req, res) => {
   /* axios.get('https://cointelegraph.com/')
    .then((response) => {
        const html = response.data
        const $ = chreerio.load(html)

        $(`a:contains("Bitcoin"), a:contains("Ethereum")`, html).each(function (){
            const title = $(this).text()
            const url = $(this).attr('href')
            articles.push({
                title,
                url
            })
        })
        res.json(articles)
    }).catch((err) => console.log(err))
})


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
*/})
