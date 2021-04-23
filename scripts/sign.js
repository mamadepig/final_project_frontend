function signUp() {
    var email = $('#email').val();
    var username = email;
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
        alter("Sign Up successfully!");
        console.log('user name is ' + cognitoUser.getUsername());
    });
    console.log("Sign Up Success");
    console.log(email);
    console.log(password);
}

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
