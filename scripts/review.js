window.onload = function(){
    var a = location.href;
    var email = a.substr(a.lastIndexOf("?") + 1).split("=");
    console.log(email);
    console.log(email[0] == "email");
    console.log(email[1]);
    if (email[0] == "email"){
        document.getElementById("signin").innerHTML = email[1];
        document.getElementById("destination").href = "destination.html?email=" + email[1];
        document.getElementById("review").href = "review.html?email=" + email[1];
        document.getElementById("homepagelink").href = "index.html?email=" + email[1];
    }else{
        document.getElementById("signin").innerHTML = "Sign in/Sign up";
    }
}

function SearchReview() {
    var apigClient = apigClientFactory.newClient({});

    var destination = $("#search").val();
    console.log(destination);
    var body = {
        "q": destination
    }
    var params = {
        "q": destination
    }
    apigClient.searchGet(params, body, {}).then(
        (result) => {
            console.log("result");
            var data = result.data.results;
            console.log(data);
            var showResult = "<div id='reviewResult'>";
            for (let i = 0; i < data.length; i++){
                var userEmail = data[i].useremail;
                var texturl = data[i].texturl;
                var imgurl = data[i].imageurl;
                console.log(userEmail);
                console.log(texturl);
                console.log(imgurl);
                showResult += "<div class='restaurant'> <h3> Review " + (i + 1) + "</h3>" + "<div class='resImage'><img class='show' src=" + imgurl + ">" + "<div class='resText'> User: " + userEmail + "</br>Review: </br>"+ texturl + "</br></br></div>"+ "</div></div>";
            }
            showResult += "</div>";
            document.getElementById("searchResult").innerHTML = showResult;
        }
    ).catch(
        (err) => {
            console.log("err");
            console.log(err);
        }
    )
}


function uploadReview() {
    var email = document.getElementById("signin").innerHTML;
    if (email == "Sign in/Sign up") {
        alert("Sign in first please");
    }else{
        window.open("writeGuides.html?email=" + email, "_self");
    }
}
