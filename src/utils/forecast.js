const request = require('request')

const forecast = (longitude, latitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=d64d83738d435ce4f9aeccd37be738f9&query='+longitude+','+latitude+''
    request({url, json: true},(error, {body})=>{
        if(error){
            callback('Unable to connect to the server',undefined)
        } else if(body.error){
            callback('Unable to find the location',undefined)
        } else
        {
            callback(undefined,'It is currently '+body.current.temperature+' degree out. It feels like '+body.current.feelslike+' degree. Humidity is '+body.current.humidity+'%.')
        }
    })
}

module.exports = forecast