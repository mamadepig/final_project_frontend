window.onload = function() {
    var a = location.href;
    if (a.split("?")[1] === undefined) {
        document.getElementById("signin").innerHTML = "Sign in/Sign up";
    }else {
        var emailArray = a.split("?")[1].split("=")
        if (emailArray[0] == "email") {
            document.getElementById("signin").innerHTML = emailArray[1];
            document.getElementById("review").href = "review.html?email=" + emailArray[1];
            document.getElementById("signin").href = "updateUserData.html?email=" + emailArray[1];
        } else {
            document.getElementById("signin").innerHTML = "Sign in/Sign up";
        }
    }
}

function searchRestaurant() {
    var location_value = $("#search").val();
    var days = $("#days").val();
    console.log(days);
    if (location_value == "") {
        alert("Please enter a destination");
    }
    else{
        var a = location.href;
        var emailArray = a.split("?")[1].split("=")
        window.open("searchResult.html?email=" + emailArray[1] + "&location=" + location_value + "&days=" + days);
    }
}