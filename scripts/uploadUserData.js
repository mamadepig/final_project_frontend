var a = location.href;
var email_address = a.split("?")[1].split("=")[1]

function uploadData () {
    var restaurantsType = document.getElementsByName("res")
    var resValue = new Array();
    for (var i = 0; i< restaurantsType.length; i++){
        if (restaurantsType[i].checked){
            resValue.push(restaurantsType[i].value);
        }
    }
    var priceRange = document.getElementsByName("priceRange")
    var priceValue = null;
    for (var i = 0; i< priceRange.length; i++){
        if (priceRange[i].checked){
            priceValue = priceRange[i].value;
        }
    }

    console.log(priceValue);
    console.log(resValue);
    console.log(email_address)

    var apigClient = apigClientFactory.newClient({});
    var params = {
        "cuisine": resValue,
        "email": email_address,
        "moneylevel": priceValue
    }
    apigClient.storedataPut(params, {}, {}).then(
        (result) => {
            console.log("upload successfully");
            alert("Update Successfully!");
            window.open("index.html?email=" + email_address, "_self");
        }
    ).catch(
        (err) => {
            console.log(err);
        }
    )
}

function signOut() {
    window.open("index.html", "_self");
}
