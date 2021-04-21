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
            console.log(result);
            var showRestaurant = "";
            var showLandmarks = "";
            var showHotels = "";
            var all_result = result.data;
            var landmark = all_result.slice(0, 5);
            var restaurants = all_result.slice(5, 10);
            var hotel = all_result.slice(10, 15);
            console.log(landmark);
            console.log(hotel);
            console.log(restaurants);
            for (let i = 0; i < restaurants.length; i++){
                var name = restaurants[i].name;
                var address = restaurants[i].address;
                var rating = restaurants[i].rating;
                var photo = restaurants[i].photo;
                console.log(name, address, rating, photo);
                showRestaurant += "<div class='restaurant'>" + "<div class='resImage'><img class= 'show' src='https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + photo + "&key=AIzaSyAL2QUFOh2P2gV2h2_b-P7f47xNO801WWo'>" + "<div class='resText'> Restaurant Name:" + name + "<br>Address: " + address + "<br>Rating: " + rating + "</div>" +  "</div></div>"
            }

            for (let i = 0; i < hotel.length; i++){
                var name = hotel[i].name;
                var address = hotel[i].address;
                var rating = hotel[i].rating;
                var photo = hotel[i].photo;
                console.log(name, address, rating, photo);
                showHotels += "<div class='restaurant'>" + "<div class='resImage'><img class= 'show' src='https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + photo + "&key=AIzaSyAL2QUFOh2P2gV2h2_b-P7f47xNO801WWo'>" + "<div class='resText'> Hotel Name:" + name + "<br>Address: " + address + "<br>Rating: " + rating + "</div>" +  "</div></div>"
            }

            for (let i = 0; i < landmark.length; i++){
                var name = landmark[i].name;
                var address = landmark[i].address;
                var rating = landmark[i].rating;
                var photo = landmark[i].photo;
                console.log(name, address, rating, photo);
                showLandmarks += "<div class='restaurant'>" + "<div class='resImage'><img class= 'show' src='https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + photo + "&key=AIzaSyAL2QUFOh2P2gV2h2_b-P7f47xNO801WWo'>" + "<div class='resText'> Landmark Name:" + name + "<br>Address: " + address + "<br>Rating: " + rating + "</div>" +  "</div></div>"
            }
            console.log(showRestaurant);
            document.getElementById("showRestaurant").innerHTML = showRestaurant;
            document.getElementById("showHotels").innerHTML = showHotels;
            document.getElementById("showLandmarks").innerHTML = showLandmarks;
        }

    ).catch(
        (error) => {
            console.log(error);
        }
    )
}



