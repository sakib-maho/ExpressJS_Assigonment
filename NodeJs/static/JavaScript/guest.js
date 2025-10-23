/**
 * Copyright (c) 2025 sakib-maho
 * Licensed under the MIT License
 * See LICENSE file for details
 */

function increment() {
    let value = Number(document.getElementById("guests_no").innerHTML);

    value = value + 1;
    document.getElementById("guests_no").innerHTML = value;
    console.log(value)

    document.getElementById("guest_no").innerHTML = value + " Guest";
}


function deccrement() {
    let value = Number(document.getElementById("guests_no").innerHTML);

    value = value - 1;
    if (value >= 0) {
        document.getElementById("guests_no").innerHTML = value;
        console.log(value)
        document.getElementById("guest_no").innerHTML = value + " Guest";

    }


}

