// FB

window.fbAsyncInit = function() {
FB.init({
    appId      : 'squarematch',
    cookie     : true,
    xfbml      : true,
    version    : 'v5.0'
});
    
FB.AppEvents.logPageView();
checkLoginState();   
    
};

(function(d, s, id){
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) {return;}
js = d.createElement(s); js.id = id;
js.src = "https://connect.facebook.net/en_US/sdk.js";
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(response) {
    if (response.status === 'connected') {
        sessionStorage.setItem('currentUser', response.email);
        alert(`Signed in as ${response.name}`);
    }
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

// Google

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut();
    document.getElementById("login-check").selectedIndex = 0;
}

function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile().getEmail();
    // let id_token = googleUser.getAuthResponse().id_token;
    sessionStorage.setItem('currentUser', profile.getEmail());
    alert(`Signed in as ${profile.getName()}`);
}