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
    }else{
        document.getElementById("signin").innerHTML = "Sign in/Sign up";
    }
}