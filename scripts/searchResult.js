window.onload = function(){
    var a = location.href;
    var email = a.substr(a.lastIndexOf("?") + 1).split("=");
    console.log(email);
    console.log(email[0] == "email");
    console.log(email[1]);
    var email_location = email[1].split("&");
    var email_address = email_location[0];
    var search_location = email[2];
    console.log(email[2]);
    if (email[0] == "email"){
        document.getElementById("signin").innerHTML = email_address;
        document.getElementById("destination").href = "destination.html?email=" + email_address;
        document.getElementById("review").href = "review.html?email=" + email_address;
    }else {
        document.getElementById("signin").innerHTML = "Sign in/Sign up";
    }

    var apigClient = apigClientFactory.newClient({});
    var params = {
        "restaurant": search_location
    }

    apigClient.searchrestaurantsGet(params, {},{}).then(
        (result) => {
            var show = "";
            var restaurants = result.data
            console.log(restaurants);
            for (let i = 0; i < restaurants.length; i++){
                var name = restaurants[i].name;
                var address = restaurants[i].address;
                var rating = restaurants[i].rating;
                var photo = restaurants[i].photo;
                console.log(name, address, rating, photo)
                show += "<div>name:" + name + "address: " + address + "rating: " + rating + "</div>" + " <img src='https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + photo + "&key=AIzaSyAL2QUFOh2P2gV2h2_b-P7f47xNO801WWo'>"
            }
            console.log(show);
            document.getElementById("showresult").innerHTML = show;
        }

    ).catch(
        (error) => {
            console.log(error);
        }
    )
}



