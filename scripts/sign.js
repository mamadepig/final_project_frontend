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
    alert("Sign In Success");
    window.cookie = email;
    console.log(window.cookie);
    window.open("index.html?email=" + email, "_self");
}

function signUp() {
    var email = $('#email').val();
    var password = $('#password').val();
    console.log("Sign Up Success");
    console.log(email);
    console.log(password);
}
