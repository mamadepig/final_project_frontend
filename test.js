var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
console.log(AmazonCognitoIdentity)
var email = $('#email').val();
var username = email;
var password = $('#password').val();
console.log(AmazonCognitoIdentity.CognitoUserPool)
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
    UserPoolId: " us-west-2_z8EDMVXEh",
    ClientId: "5rcclg2ubngm30t6g462f521"
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
    console.log('user name is ' + cognitoUser.getUsername());
});
console.log("Sign Up Success");
console.log(email);
console.log(password);