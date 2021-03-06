
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
        !sessionStorage.getItem('seenFBNotice') && alert(`Signed in as ${response.name}`);
        sessionStorage.setItem('seenFBNotice', true);
    } else {
        fbButton.style.top = '49px';
        gSignIn.style.visibility = 'visible';
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
    document.getElementsByClassName('fb-login-button')[0].style.display = 'block';
    document.getElementsByClassName('googleSignOut')[0].style.visibility = 'hidden';
}

function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    sessionStorage.setItem('currentUser', profile.getEmail());
    document.getElementsByClassName('fb-login-button')[0].style.display = 'none';
    document.getElementsByClassName('googleSignOut')[0].style.visibility = 'visible';
    !sessionStorage.getItem('seenGoogleNotice') && alert(`Signed in as ${profile.getName()}`);
    sessionStorage.setItem('seenGoogleNotice', true);
}