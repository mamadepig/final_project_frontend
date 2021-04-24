function signIn() {
    var email = $('#email').val();
    var password = $('#password').val();
    if (password == ""){
        alert("Please enter the password");
        $("#password").focus();
        return ;
    }else if (email == ""){
        alert("Please enter the email");
        $("#email").focus();
        return ;
    }
    console.log("sign in");
    console.log(email);
    console.log(password);
    var poolData = {
        UserPoolId: "us-west-2_E84XBOT2e",
        ClientId: "467fs4oagon32igpc3lcgteqq4"
    }
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
        Username: email,
        Pool: userPool
    }
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    let authData = {
        Username: email,
        Password: password
    }
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
            alert("Sign In Success");
            window.open("index.html?email=" + email, "_self");
        },
        onFailure: function(err){
            alert(err.message || JSON.stringify(err));
        }
    })
}
