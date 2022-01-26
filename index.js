const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const chreerio = require('cheerio')
const { response } = require('express')

const app = express()


const newinfos = [
    {
        name: 'cointhelegraph',
        address:'https://www.cointelegraph.com/',
        base:''
    
    },
    {
        name: 'time',
        address:'https://www.time.com/nextadvisor/investing/cryptocurrency/',
        base:'https://www.time.com/nextadvisor/investing'
    },
    {
        name:'cryptonew',
        address:'https://cryptonews.net/',
        base:''
    },
    {
        name:'coindesk',
        address:'https://www.coindesk.com/',
        base:''
    },
    {
        name:'todayonchain',
        address:'https://www.todayonchain.com/',
        base:''
    },
    {
        name:'newsbtc',
        address:'https://www.newsbtc.com/',
        base:''
    }
]


const articles = []


newinfos.forEach(newinfo => {
    axios.get(newinfo.address)
    .then(response => {
        const html = response.data
        const $ = chreerio.load(html) 

        $(`a:contains("Bitcoin"), a:contains("Ethereum")`, html).each(function (){
           const title = $(this).text()
           const url = $(this).attr('href')

           articles.push({
               title,
               url: newinfo.base + url,
               source: newinfo.name
           })
        
        })


    }) 
})


app.get('/', (req, res) => {
    res.json('Welcome to my CryptoNews Api')
})

app.get('/news', (req, res) => {
   res.json(articles)
})

app.get('/news/:newinfoId', (req, res) => {
    const newinfoId = req.params.newinfoId

   const newinfoAddresse = newinfos.filter(newinfo => newinfo.name == newinfoId)[0].address

   const newinfoBase = newinfos.filter(newinfo => newinfo.name == newinfoId)[0].base

    axios.get(newinfoAddresse)
    .then(response => {
        const html = response.data
        const $ = chreerio.load(html)
        const spesificArticles = []

        $(`a:contains("Bitcoin"), a:contains("Ethereum")`, html).each(function(){
           const title = $(this).text()
           const url = $(this).attr('href')
           spesificArticles.push({
               title,
               url: newinfoBase + url,
               source: newinfoId
           }) 
        })
        res.json(spesificArticles)
    }).catch(err => console.log(err))
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

