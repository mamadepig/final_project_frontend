var hotel = null;
var plan = null;

window.onload = function(){
    var a = location.href;
    var data = a.split("?")[1].split("&")
    console.log(data)
    var email_address = data[0].split("=")[1]
    console.log(email_address)
    var search_location = data[1].split("=")[1]
    console.log(location)
    var dayNumber = data[2].split("=")[1]
    console.log(dayNumber)
    if (data[0].split("=")[0] == "email"){
        document.getElementById("signin").innerHTML = email_address;
        document.getElementById("review").href = "review.html?email=" + email_address;
        document.getElementById("signin").href = "updateUserData.html?email=" + email_address;
    }else {
        document.getElementById("signin").innerHTML = "Sign in/Sign up";
    }

    var apigClient = apigClientFactory.newClient({});
    var params = {
        "restaurant": search_location,
        "email": email_address,
        "days": dayNumber
    }

    apigClient.searchrestaurantsGet(params, {},{}).then(
        (result) => {
            console.log(result);
            var showHotels = "";
            var showPlan = "";
            var all_result = result.data;
            hotel = all_result.slice(0, 3);
            plan = all_result.slice(3, all_result.length)
            console.log(hotel);
            console.log(plan);
            showHotels += "<div style='background-color: #0099cc'><h1 style='color: white'>Hotels</h1>"
            for (let i = 0; i < hotel.length; i++){
                var name = hotel[i].name;
                var address = hotel[i].address;
                var rating = hotel[i].rating;
                var photo = hotel[i].photo;
                console.log(name, address, rating, photo);
                showHotels += "<div class='restaurant'>" + "<div class='resImage'><img class= 'show' src='https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + photo + "&key=AIzaSyAL2QUFOh2P2gV2h2_b-P7f47xNO801WWo'>" + "<div class='resText'> Name: " + name + "<br>Address: " + address + "<br>Rating: " + rating + "</div>" +  "</div></div>"
            }
            showHotels += "</div>"
            console.log(plan);

            showPlan += "<div style='background-color: #0099cc'><h1 style='color: white'>Plan</h1>"
            for (let i = 0; i < dayNumber; i++) {
                showPlan += "<h2 style='color:white'> Day" + (i + 1) + "</h2>";
                showPlan += "<h3 style='color: white'> Morning </h3>";
                showPlan += "<div class='restaurant'>" + "<div class='resImage'><img class= 'show' src='https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + plan[4 * i].photo + "&key=AIzaSyAL2QUFOh2P2gV2h2_b-P7f47xNO801WWo'>" + "<div class='resText'> Name: " + plan[4 * i].name + "<br>Address: " + plan[4 * i].address + "<br>Rating: " + plan[4 * i].rating + "</div>" +  "</div></div>";
                showPlan += "<h3 style='color: white'> Lunch </h3>"
                showPlan += "<div class='restaurant'>" + "<div class='resImage'><img class= 'show' src='https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + plan[4 * i + 1].photo + "&key=AIzaSyAL2QUFOh2P2gV2h2_b-P7f47xNO801WWo'>" + "<div class='resText'> Name: " + plan[4 * i + 1].name + "<br>Address: " + plan[4 * i + 1].address + "<br>Rating: " + plan[4 * i + 1].rating + "<br> Distance from "+plan[4 * i].name+": " + plan[4 * i + 1].distance + "<br> Drive by car: " + plan[4 * i + 1].duration + "</div>" +  "</div></div>";
                showPlan += "<h3 style='color: white'> Afternoon </h3>"
                showPlan += "<div class='restaurant'>" + "<div class='resImage'><img class= 'show' src='https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + plan[4 * i + 2].photo + "&key=AIzaSyAL2QUFOh2P2gV2h2_b-P7f47xNO801WWo'>" + "<div class='resText'> Name: " + plan[4 * i + 2].name + "<br>Address: " + plan[4 * i + 2].address + "<br>Rating: " + plan[4 * i + 2].rating + "<br> Distance from "+plan[4 * i+1].name+": "  + plan[4 * i + 1].distance + "<br> Drive by car: " + plan[4 * i + 2].duration + "</div>" +  "</div></div>";
                showPlan += "<h3 style='color: white'> Dinner </h3>"
                showPlan += "<div class='restaurant'>" + "<div class='resImage'><img class= 'show' src='https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + plan[4 * i + 3].photo + "&key=AIzaSyAL2QUFOh2P2gV2h2_b-P7f47xNO801WWo'>" + "<div class='resText'> Name: " + plan[4 * i + 3].name + "<br>Address: " + plan[4 * i + 3].address + "<br>Rating: " + plan[4 * i + 3].rating + "<br> Distance from "+plan[4 * i+2].name+": "  + plan[4 * i + 1].distance + "<br> Drive by car: " + plan[4 * i + 3].duration + "</div>" +  "</div></div>";
            }
            showPlan += "<div id=\"search destination\"><label for=\"search\" style=\"color: white\">Email the plan to me</label><br><br>\n" +
                        "<button type=\"button\" onclick=\"email_plan()\">email me</button></div>";

            document.getElementById("showHotels").innerHTML =  showHotels;
            document.getElementById("showPlan").innerHTML = showPlan;
        }

    ).catch(
        (error) => {
            console.log(error);
        }
    )
}

function email_plan() {
    var a = location.href;
    var data = a.split("?")[1].split("&")
    var email_address = data[0].split("=")[1]
    var search_location = data[1].split("=")[1]
    var dayNumber = data[2].split("=")[1]

    console.log(plan);
    console.log(hotel);
    console.log(email_address);

    var apigClient = apigClientFactory.newClient({});

    var params = {
        "hotel": JSON.stringify(hotel),
        "location": search_location,
        "email": email_address,
        "days": dayNumber,
        "plan": JSON.stringify(plan),
    }

    apigClient.sendemailPut(params, {},{}).then(
        (result) => {
            console.log("upload successfully");
            alert("email sent successfully");
            window.open("index.html?email=" + email_address, "_self");
        }
    ).catch(
        (err) => {
            console.log(err);
        }
    )

    


}


