const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port  = process.env.PORT || 3000

const app = express();
// define path for epress config
const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')

const partialsDir = path.join(__dirname, '../templates/partials')
//setup handlebars engine and views location
app.set('views', viewsDir);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsDir);

app.use(express.static(publicDir));
app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'mohamed'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about',
        name: 'mohamed'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        help: 'this is helpful text',
        name: 'mohamed',
        title: 'help'
    });
});
app.get('/weather', (req,res) => {
    if(! req.query.address){
        return res.send({
            error: 'you must provide an address'
        });
    }
    geocode(req.query.address,(error,{latitude , longitude ,location} ={})=>{
    
        if(error){
            return res.send({
                error: error
            });
        }  
        forecast(latitude , longitude ,(error ,forecastData)=>{
            if(error){
                return res.send({
                    error: error
                });
            }
            res.send({
                location,
                address:req.query.address,
                forecast: forecastData
            });
        })
        
    })
  
});

app.get('/products',(req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        });


    }
    console.log(req.query.search); 
    res.send({
         products:[]
     })
});
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'mohamed',
        errorMessage: 'help article not found.'
    });
});
app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'mohamed',
        errorMessage: 'Page Not Found.'
    });
});

app.listen(port, () => {
    console.log('server is up on port ' +port);
});