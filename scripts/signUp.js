
function signUp() {
    var email = $('#email').val();
    var username = email;
    var password = $('#password').val();
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
    var anwser3 = document.getElementsByName("q3")
    var anwser3Value = null;
    for (var i = 0; i< anwser3.length; i++){
        if (anwser3[i].checked){
            anwser3Value = anwser3[i].value;
        }
    }
    console.log(anwser3Value);
    console.log(priceValue);
    console.log(resValue);
    if (password == ""){
        alert("Please enter the password");
        $("#password").focus();
        return ;
    }else if (email == ""){
        alert("Please enter the email");
        $("#email").focus();
        return ;
    }
    var poolData = {
        UserPoolId: "us-west-2_E84XBOT2e",
        ClientId: "467fs4oagon32igpc3lcgteqq4"
    }
    var attributeList = [];
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    console.log(userPool)
    var dataEmail = {
        Name: "email",
        Value: email
    };
    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);
    userPool.signUp(username, password, attributeList, null, function(
        err,
        result
    ) {
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        }
        var cognitoUser = result.user;
        alert("Sign up successfully!");
        console.log('user name is ' + cognitoUser.getUsername());
    });
    console.log("Sign Up Success");
    console.log(email);
    console.log(password);
}
