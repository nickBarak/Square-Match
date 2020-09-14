
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
    let gSignIn = document.getElementsByClassName('g-signin2')[0],
        gSignOut = document.getElementsByClassName('googleSignOut')[0],
        fbButton = document.getElementsByClassName('fb-login-button')[0];
    if (response.status === 'connected') {
        sessionStorage.setItem('currentUser', response.email);
        gSignIn.style.visibility = gSignOut.style.visibility = 'hidden';
        fbButton.style.top = '12.5px';
        alert(`Signed in as ${response.name}`);
    } else {
        fbButton.style.top = '49px';
        gSignIn.style.visibility = gSignOut.style.visibility = 'visible';
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
    document.getElementById('facebook').style.visibility = 'visible';
}

function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile().getEmail();
    sessionStorage.setItem('currentUser', profile.getEmail());
    document.getElementsByClassName('fb-login-button')[0].style.visibility = 'hidden';
    alert(`Signed in as ${profile.getName()}`);
}