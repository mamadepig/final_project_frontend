window.onload = function(){
    var a = location.href;
    var email = a.substr(a.lastIndexOf("?") + 1).split("=");
    console.log(email);
    console.log(email[0] == "email");
    console.log(email[1]);
    if (email[0] == "email"){
        document.getElementById("signin").innerHTML = email[1];
        document.getElementById("review").href = "review.html?email=" + email[1];
        document.getElementById("homepagelink").href = "index.html?email=" + email[1];
        document.getElementById("signin").href = "updateUserData.html?email=" + email[1];
    }else{
        document.getElementById("signin").innerHTML = "Sign in/Sign up";
    };
}

var imagename = "";
var encoded_image = null;
var file_type = null;

function preview() {
    var reader = new FileReader();
    var f = document.getElementById("file").files[0];
    imagename = f.name;
    file_type = imagename.split(".")[1];
    console.log(imagename);
    console.log(file_type);
    reader.readAsDataURL(f);
    reader.onload = function(e) {
        document.getElementById("img3").src = this.result;
        var src = e.target.result;
        encoded_image = src.split(",")[1];
        $("#img3").css("display", "block");
    };
}

function upload() {
    var text = $("#writeArea").val();
    var destination = $("#destination1").val();
    console.log(encoded_image);
    var userkey = location.href.substr(location.href.lastIndexOf("?") + 1).split("=")[1];
    console.log(userkey);
    var date = Date.now();
    var textname = userkey.replace(".", "").replace("@","") + date + ".txt";
    var imagename = userkey.replace(".", "").replace("@","") + date + "." + file_type;
    console.log(textname);

    var apigClient = apigClientFactory.newClient({});

    var params = {
        "filename": textname,
        "customlabels": destination,
        "Content-Type": "text/plain",
        "imagetype": file_type,
        "useremail": userkey,
    };

    var additionalParams = {
        "filename": textname,
        "customlabels": destination,
        "Content-Type": "text/plain"
    };

    apigClient.uploadPut(params, text, additionalParams).then(
        (result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
    })

    var params = {
        "filename": imagename,
        "customlabels": destination,
        "Content-Type": "image/jpg;base64"
    };

    var additionalParams = {
        "filename": imagename,
        "customlabels": destination,
        "Content-Type": "image/jpg;base64"
    };

    apigClient.uploadphotoPut(params, encoded_image, additionalParams).then(
        (result) => {
            console.log(result);
            alert("upload successfully");
            window.open("review.html?email="+userkey);
        }).catch((error) => {
        console.log(error);
    })

}
