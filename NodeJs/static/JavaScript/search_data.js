
function showData() {
    let travelLocation = document.getElementById("search_input").value;
    let checkInDate = document.getElementById("checkInDate").value;
    let checkOutDate = document.getElementById("checkOutDate").value;
    let guests_no = document.getElementById("guests_no").innerHTML;
    let amount = document.getElementById("amount").value;

   

    if (travelLocation == "" || checkInDate == "" || checkOutDate == "") {
        document.getElementById("search_data").style.display = "none"
        document.getElementById("invalid_data").style.display = "block"
    }else{
        document.getElementById("search_data").style.display = "block"
        document.getElementById("invalid_data").style.display = "none"
        document.getElementById("search1").innerHTML = travelLocation;
        document.getElementById("checkin").innerHTML = checkInDate;
        document.getElementById("checkout").innerHTML = checkOutDate;
        document.getElementById("guests").innerHTML = guests_no;
        document.getElementById("priceRange").innerHTML = amount;
    }

    document.getElementById("search_input").value = "";
    document.getElementById("checkInDate").value = "";
    document.getElementById("checkOutDate").value = "";
    document.getElementById("guest_no").innerHTML = " Guests";
    document.getElementById("price_range").innerHTML = "Price Range";


    console.log(travelLocation);
    console.log(checkInDate);
    console.log(checkOutDate);
    console.log(guests_no);
    console.log(amount);
}

