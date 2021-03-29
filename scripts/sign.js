function signIn() {
    var email = $('#email').val();
    var password = $('#password').val();
    console.log("sign in");
    console.log(email);
    console.log(password);
    alert("Sign In Success");
    window.location.href="index.html"
}

function signUp() {
    var email = $('#email').val();
    var password = $('#password').val();
    console.log("Sign Up Success");
    console.log(email);
    console.log(password);
}
