/**
 * Copyright (c) 2025 sakib-maho
 * Licensed under the MIT License
 * See LICENSE file for details
 */


var searchInput = 'search_input';

function myFunction() {


    var input = document.getElementById('search_input');
    input.addEventListener('keydown', function (event) {
        const key = event.key; // const {key} = event; ES6+
        if (key === "Backspace") {
            let data = document.getElementById("search_input").value;
            console.log(data.length - 1);
            if (data.length - 1 < 3) {
                console.log("Done2");
            } else {
                console.log("Done")
            }
        }
        else {

        }
    });





    if (document.getElementById("search_input").value != null) {
        let data = document.getElementById("search_input").value;
        console.log(data.length + 1);
        if (data.length + 2 == 3) {
            $(document).ready(function () {

                var autocomplete;

                autocomplete = new google.maps.places.Autocomplete((document.getElementById(searchInput)), {

                    types: ['geocode'],

                });
                if (data.length + 2 == 3) {
                    google.maps.event.addListener(autocomplete, 'place_changed', function () {


                        var near_place = autocomplete.getPlace();


                    });
                }

            });

        }
    }
}



