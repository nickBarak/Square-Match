function fbSDKLoaded() {
    FB.getLoginStatus((response) => statusChangeCallback(response));
    console.log(response);
}