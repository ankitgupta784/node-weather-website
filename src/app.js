const path = require('path')
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000
    
//defining the path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Ankit Gupta'
    });
});

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About me',
        name: 'Ankit Gupta'
    });
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, data) => {
        if(error){
            return res.send({ error })
        }
        forecast(data.latitude, data.longitude, (error, data) => {
            if(error){
                return res.send({ error })
            }
            else{
                console.log('Forecast->>>', data);
                res.send({
                        forecast: data,
                        address: req.query.address
                    })
            }
         })    
    })
    
    //console.log(req.query);
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
})



app.get('/help', (req, res) => {
    res.render('help',{
        helpText: 'this is some helpful text',
        title: 'Help',
        name: 'Ankit Gupta'
    });
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        errorMessage: 'Help article not found',
        title: '404',
        name: 'Ankit Gupta'
    });
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Ankit Gupta'
    });
});
app.listen(port, () => {
    console.log('Server is up on port ' + port);
})