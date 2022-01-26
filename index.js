const PORT = 8000
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

app.get('/news/:newinfoId', async(req, res) => {
    const newinfoId = req.params.newinfoId

   const newinfo = newinfos.filter(newinfo => newinfo.name === newinfoId)

    //axios.get()
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

