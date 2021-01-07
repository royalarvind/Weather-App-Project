const hbs = require('hbs')
const path = require('path')
const express = require('express')
const app = express()

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const partialspath = path.join(__dirname, '../templates/partials')
const staticpathurl = path.join(__dirname,'../public')
const viewspath = path.join(__dirname, '../templates/views')


app.set('views', viewspath)
app.set('view engine','hbs')
hbs.registerPartials(partialspath)

app.use(express.static(staticpathurl)) 

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Arvind Singh Kaviya'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name:'Arvind Singh Kaviya'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name:'Arvind Singh Kaviya'
    })
})

app.get('/weather',(req,res)=>{
    
    if(!req.query.address)
    {
        return res.send({
            error:"Please provid an address!"
        })
    }
    
    geocode(req.query.address,(error, {longitude, latitude,location}={})=>{
        if(error)
        {
            return  res.send({
                error:error
            })
        }
        forecast(longitude, latitude,(error,forecastdata)=>{
            if(error) 
            return  res.send({
                error:error
            })
            res.send({
                Location: location,
                Forecast: forecastdata
            })
        })
     })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        message:'This help article not found',
        name:'Arvind Singh Kaviya'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        message:'Page not found',
        name:'Arvind Singh Kaviya'
    })
})

app.listen(3000,()=>{
    console.log("server is up and running on port 3000")
})