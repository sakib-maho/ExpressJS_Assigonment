const express = require('express');
const path = require('path');
const request = require('request');
const rateLimit = require("express-rate-limit");

//init app
const app = express();







//Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'static')));

let city;
let country;
let avr_maxtemp_c;
let avr_maxtemp_f;
let avr_mintemp_c;
let avr_mintemp_f;
let avr_avgtemp_c;
let avr_avgtemp_f;




const apiRequestLimiter = rateLimit({
    windowMs: 1 * 30 * 1000, // 30 second
    max: 1, // start blocking after 1 requests
    message:
        "Too many API request from this IP, please try again after 30 second",
});


//home route
app.get('/all/:country/:city', function (req, res) {


    var fs = require('fs');
    var savedData = fs.readFileSync('data.json');

    var words = JSON.parse(savedData);

    console.log(words["Dhaka"]["city"]);
    console.log(words["Toronto"]["country"]);
    console.log(words["Toronto"]["city"]);


    // for (const property in words) {
    //     console.log(property);
    //   }

    findcity = req.params.city;
    fcountry = req.params.country;

    if (words[findcity] != null) {
        console.log("Exist");
        if (fcountry == words[findcity]["country"] && findcity == words[findcity]["city"]) {
            console.log("check");
            console.log(fcountry, findcity);
        }
        else {
            res.send("Invalid Entry");
        }
        res.render('hotel', { city: findcity, country: words[findcity]["country"], avr_maxtemp_c: words[findcity]["avr_maxtemp_c"], avr_maxtemp_f: words[findcity]["avr_maxtemp_f"], avr_mintemp_c: words[findcity]["avr_mintemp_c"], avr_mintemp_f: words[findcity]["avr_mintemp_f"], avr_avgtemp_c: words[findcity]["avr_avgtemp_c"], avr_avgtemp_f: words[findcity]["avr_avgtemp_f"] });
        // document.getElementById("High1").innerHTML = words[findcity]["avr_maxtemp_c"];
        // document.getElementById("low1").innerHTML = words[findcity]["avr_mintemp_c"];


    } else {


        //console.log("here");
        let city;
        let country;
        let avr_maxtemp_c;
        let avr_maxtemp_f;
        let avr_mintemp_c;
        let avr_mintemp_f;
        let avr_avgtemp_c;
        let avr_avgtemp_f;


        function first() {
            //alert("second");



            const request = require('request');


            const options = {
                method: 'GET',
                url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
                qs: { q: findcity, days: '3' },
                headers: {
                    'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
                    'x-rapidapi-key': 'c34f585326msh0e3377ac7a481eap1958ddjsn61d6ffaf55f7',
                    useQueryString: true
                }
            };



            //something crazy

            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                var data = JSON.parse(body);
                console.log(data.location.name)
                city = data.location.name;
                country = data.location.country;
                if (fcountry == country && findcity == city) {
                    console.log("check");
                    console.log(fcountry, findcity);
                }
                else {
                    //res.send("Invalid Input");
                }


            });



            //end

            console.log("++++++++++++++++++++++++++++++++++++")
            if (words[findcity] != null) {
                console.log("=======================================================");
                console.log("=====Exist new");
                console.log("=======================================================");
            } else {
                console.log("=======================================================");
                console.log("=====Not Exist new");
                console.log(city);
                console.log("=======================================================");
            }



        }

        async function second() {
            //alert("first");
            console.log("--------------------------------")
            const request = require('request');


            const options = {
                method: 'GET',
                url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
                qs: { q: findcity, days: '3' },
                headers: {
                    'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
                    'x-rapidapi-key': 'c34f585326msh0e3377ac7a481eap1958ddjsn61d6ffaf55f7',
                    useQueryString: true
                }
            };

            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                var data = JSON.parse(body);
                console.log(data.location.name)
                city = data.location.name;
                country = data.location.country;



                avr_maxtemp_c = (Number(data.forecast.forecastday[0].day.maxtemp_c) + Number(data.forecast.forecastday[1].day.maxtemp_c) + Number(data.forecast.forecastday[2].day.maxtemp_c)) / 3
                avr_maxtemp_f = (Number(data.forecast.forecastday[0].day.maxtemp_f) + Number(data.forecast.forecastday[1].day.maxtemp_f) + Number(data.forecast.forecastday[2].day.maxtemp_f)) / 3
                avr_mintemp_c = (Number(data.forecast.forecastday[0].day.mintemp_c) + Number(data.forecast.forecastday[1].day.mintemp_c) + Number(data.forecast.forecastday[2].day.mintemp_c)) / 3
                avr_mintemp_f = (Number(data.forecast.forecastday[0].day.mintemp_f) + Number(data.forecast.forecastday[1].day.mintemp_f) + Number(data.forecast.forecastday[2].day.mintemp_f)) / 3
                avr_avgtemp_c = (Number(data.forecast.forecastday[0].day.avgtemp_c) + Number(data.forecast.forecastday[1].day.avgtemp_c) + Number(data.forecast.forecastday[2].day.avgtemp_c)) / 3
                avr_avgtemp_f = (Number(data.forecast.forecastday[0].day.avgtemp_f) + Number(data.forecast.forecastday[1].day.avgtemp_f) + Number(data.forecast.forecastday[2].day.avgtemp_f)) / 3

                //console.log(body);
                console.log(Math.round(avr_avgtemp_c), avr_avgtemp_f);
                if (fcountry == country && findcity == city) {
                    console.log("check");
                    console.log(fcountry, findcity);
                    res.render('hotel', { city: city, country: country, avr_maxtemp_c: Math.round(avr_maxtemp_c), avr_maxtemp_f: Math.round(avr_maxtemp_f), avr_mintemp_c: Math.round(avr_mintemp_c), avr_mintemp_f: Math.round(avr_mintemp_f), avr_avgtemp_c: Math.round(avr_avgtemp_c), avr_avgtemp_f: Math.round(avr_avgtemp_f) });
                    var data1 = {
                        country: country,
                        city: city,
                        avr_maxtemp_c: Math.round(avr_maxtemp_c),
                        avr_maxtemp_f: Math.round(avr_maxtemp_f),
                        avr_mintemp_c: Math.round(avr_mintemp_c),
                        avr_mintemp_f: Math.round(avr_mintemp_f),
                        avr_avgtemp_c: Math.round(avr_avgtemp_c),
                        avr_avgtemp_f: Math.round(avr_avgtemp_f)
                    }

                    const dataMain = JSON.parse(fs.readFileSync('data.json'));

                    const saveData = (data, file) => {

                        const finished = (error) => {
                            if (error) {
                                console.log(error);
                                return;
                            }
                        }

                        const newData = JSON.stringify(data, null, 2);
                        fs.writeFile(file, newData, finished)
                        console.log('Saved....')
                    }

                    saveData(data1, 'second.json');


                    const savenData = (data1) => {
                        const newD = {
                            country: data1.country,
                            city: data1.city,
                            avr_maxtemp_c: data1.avr_maxtemp_c,
                            avr_maxtemp_f: data1.avr_maxtemp_f,
                            avr_mintemp_c: data1.avr_mintemp_c,
                            avr_mintemp_f: data1.avr_mintemp_f,
                            avr_avgtemp_c: data1.avr_avgtemp_c,
                            avr_avgtemp_f: data1.avr_avgtemp_f
                        }

                        dataMain[data1.city] = newD;
                        saveData(dataMain, 'data.json');
                    }

                    savenData(data1);
                }
                else {
                    res.send("Invalid Input");
                    //res.render('index');

                }

            



                // var fs = require('fs');
                // var savedData = fs.readFileSync('data.json');
                //res.render('hotel', { city: city, country: country, avr_maxtemp_c: avr_maxtemp_c, avr_maxtemp_f: avr_maxtemp_f, avr_mintemp_c: avr_mintemp_c, avr_mintemp_f: avr_mintemp_f, avr_avgtemp_c: avr_avgtemp_c, avr_avgtemp_f: avr_avgtemp_f });

                // var words = JSON.parse(savedData);
                // res.render('hotel', { city: findcity, country: words[findcity]["country"], avr_maxtemp_c: words[findcity]["avr_maxtemp_c"], avr_maxtemp_f: words[findcity]["avr_maxtemp_f"], avr_mintemp_c: words[findcity]["avr_mintemp_c"], avr_mintemp_f: words[findcity]["avr_mintemp_f"], avr_avgtemp_c: words[findcity]["avr_avgtemp_c"], avr_avgtemp_f: words[findcity]["avr_avgtemp_f"] });
            });
        }


        second().then(
            function () { first(); }
        )







    }


    //     console.log("Not Exist");
    //     city = "Delhi";
    //     const options = {
    //         method: 'GET',
    //         url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
    //         qs: { q: city, days: '3' },
    //         headers: {
    //             'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
    //             'x-rapidapi-key': 'c34f585326msh0e3377ac7a481eap1958ddjsn61d6ffaf55f7',
    //             useQueryString: true
    //         }
    //     };

    //     request(options, function (error, response, body) {
    //         if (error) throw new Error(error);

    //         //console.log(body);
    //         //
    //         //res.render("index")
    //         //console.log(body);
    //         var data = JSON.parse(body);
    //         city = data.location.name;
    //         country = data.location.country;
    //         avr_maxtemp_c = (Number(data.forecast.forecastday[0].day.maxtemp_c) + Number(data.forecast.forecastday[1].day.maxtemp_c) + Number(data.forecast.forecastday[2].day.maxtemp_c)) / 3
    //         avr_maxtemp_f = (Number(data.forecast.forecastday[0].day.maxtemp_f) + Number(data.forecast.forecastday[1].day.maxtemp_f) + Number(data.forecast.forecastday[2].day.maxtemp_f)) / 3
    //         avr_mintemp_c = (Number(data.forecast.forecastday[0].day.mintemp_c) + Number(data.forecast.forecastday[1].day.mintemp_c) + Number(data.forecast.forecastday[2].day.mintemp_c)) / 3
    //         avr_mintemp_f = (Number(data.forecast.forecastday[0].day.mintemp_f) + Number(data.forecast.forecastday[1].day.mintemp_f) + Number(data.forecast.forecastday[2].day.mintemp_f)) / 3
    //         avr_avgtemp_c = (Number(data.forecast.forecastday[0].day.avgtemp_c) + Number(data.forecast.forecastday[1].day.avgtemp_c) + Number(data.forecast.forecastday[2].day.avgtemp_c)) / 3
    //         avr_avgtemp_f = (Number(data.forecast.forecastday[0].day.avgtemp_f) + Number(data.forecast.forecastday[1].day.avgtemp_f) + Number(data.forecast.forecastday[2].day.avgtemp_f)) / 3

    //         res.send(data.location.name);

    //         console.log(Math.round(avr_avgtemp_c), avr_avgtemp_f);

    //         var data1 = {
    //             country: country,
    //             city: city,
    //             avr_maxtemp_c: Math.round(avr_maxtemp_c),
    //             avr_maxtemp_f: Math.round(avr_maxtemp_f),
    //             avr_mintemp_c: Math.round(avr_mintemp_c),
    //             avr_mintemp_f: Math.round(avr_mintemp_f),
    //             avr_avgtemp_c: Math.round(avr_avgtemp_c),
    //             avr_avgtemp_f: Math.round(avr_avgtemp_f)
    //         }

    //         //const fs = require('fs');

    //         const dataMain = JSON.parse(fs.readFileSync('data.json'));


    //         const saveData = (data, file) => {

    //             const finished = (error) => {
    //                 if (error) {
    //                     console.log(error);
    //                     return;
    //                 }
    //             }

    //             const newData = JSON.stringify(data, null, 2);
    //             fs.writeFile(file, newData, finished)
    //             console.log('Saved....')
    //         }

    //         saveData(data1, 'second.json');


    //         const savenData = (data1) => {
    //             const newD = {
    //                 country: data1.country,
    //                 city: data1.city,
    //                 avr_maxtemp_c: data1.avr_maxtemp_c,
    //                 avr_maxtemp_f: data1.avr_maxtemp_f,
    //                 avr_mintemp_c: data1.avr_mintemp_c,
    //                 avr_mintemp_f: data1.avr_mintemp_f,
    //                 avr_avgtemp_c: data1.avr_avgtemp_c,
    //                 avr_avgtemp_f: data1.avr_avgtemp_f
    //             }

    //             dataMain[data1.city] = newD;
    //             saveData(dataMain, 'data.json');
    //         }

    //         savenData(data1);

    //     });
    // }









});







// //add route
// app.get('/articles/add/', function (req, res) {
//     res.render('add_article'); {
//         title: 'Add aricles'
//     }
// });


//Dynamic Route
app.get('/all/:country', function (req, res) {
    res.render('index', { city: req.params.city, country: req.params.country });
    //res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
});

app.get('/', function (req, res) {
    res.render('index');
    //res.send("Invalid");
});


app.get('*', function (req, res) {
    //res.render('hotel', { name: req.params.country });
    res.render('index');
});


// let x = "sakib"
// //Template data sent
// app.get('/see', function (req, res) {
//     res.render('check', { title: 'Hey', message: x })
// })



//start server
app.listen(3000, function () {
    console.log('End....................')
});




/* const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
    qs: { q: 'Dhaka', days: '3' },
    headers: {
        'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
        'x-rapidapi-key': 'c34f585326msh0e3377ac7a481eap1958ddjsn61d6ffaf55f7',
        useQueryString: true
    }
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    //console.log(body);
    //res.send(body)
});
 */