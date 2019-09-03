var config =
{
    "cognitoDomainURL" : "jiracorp.auth.ap-southeast-1.amazoncognito.com",
    "cognitoClientId" : "u43f2tl674qh6guik00elvini",
    "cognitoUserPoolId" : "ap-southeast-1_zDDt4ERsW",
    "cognitoTokenScopes" : ["phone", "email", "profile", "openid", "aws.cognito.signin.user.admin"],
    "sbmpFrontendURL" : "https://2qbdm0akjg.execute-api.ap-southeast-1.amazonaws.com/Prod",
    "sbmpBackendURL" : "https://8m1adn9t35.execute-api.ap-southeast-1.amazonaws.com/Prod"
};

var frontendURL = config.sbmpFrontendURL;
var landingURL = frontendURL + '/landing';
var backendURL = config.sbmpBackendURL;
var urlfiller = '?response_type=token&client_id=' + config.cognitoClientId + '&';
var loginURL = 'https://' + config.cognitoDomainURL + '/login' + urlfiller + 'redirect_uri=' + landingURL;
var logoutURL = 'https://' + config.cognitoDomainURL + '/logout' + urlfiller + 'logout_uri=' + frontendURL;
var signupURL = 'https://' + config.cognitoDomainURL + '/signup' + urlfiller + 'redirect_uri=' + landingURL;