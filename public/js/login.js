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
    if (response.status == 'connected') {
        db.transaction('rw', db.users, tx => {
            db.open();
            db.users.add({name: response.name, email: response.email, fbID: response.userID})
            .then(response => alert(`Signed in as ${response.name}`))
            .catch(response => db.users.get({fbID: response.userID}))
            .then(user => alert(`Signed in as ${user.name}`))
            .catch(e => console.log(`Existing user signed in or: ${e}`));
            tx.on('complete', _=> db.close());
        })
    } else {
        alert('Authentication error; not signed in')
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
    let profile = googleUser.getBasicProfile();
    let id_token = googleUser.getAuthResponse().id_token;

    db.transaction('rw', db.users, tx => {
        db.open();
        db.users.add({name: profile.getName(), email: profile.getEmail(), googleID: profile.getId()})
        .then(profile => alert(`Signed in as ${profile.getName()}`))
        .catch(profile => db.users.get({googleID: profile.getId()}))
        .then(user => alert(`Signed in as ${user.name}`))
        .catch(e => console.log(`Existing user signed in or: ${e}`));
        tx.on('complete', _=> db.close());
    })
}