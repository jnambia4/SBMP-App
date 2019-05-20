var config =
{
    "cognitoDomainURL" : "https://jiracorp.auth.ap-southeast-1.amazoncognito.com",
    "cognitoClientId" : "u43f2tl674qh6guik00elvini",
    "cognitoUserPoolId" : "ap-southeast-1_zDDt4ERsW",
    "cognitoTokenScopes" : ["phone", "email", "profile", "openid", "aws.cognito.signin.user.admin"],
    "sbmpFrontendURL" : "https://2qbdm0akjg.execute-api.ap-southeast-1.amazonaws.com/Prod",
    "sbmpBackendURL" : "https://cmxnlf3nq1.execute-api.ap-southeast-1.amazonaws.com/Prod"
};

var frontendURL = config.sbmpFrontendURL;
var landingURL = frontendURL + '/landing';
var backendURL = config.sbmpBackendURL;
var urlfiller = '?response_type=token&client_id=' + config.cognitoClientId + '&';
var loginURL = config.cognitoDomainURL + '/login' + urlfiller + 'redirect_uri=' + landingURL;
var logoutURL = config.cognitoDomainURL + '/logout' + urlfiller + 'logout_uri=' + loginURL;
var signupURL = config.cognitoDomainURL + '/signup' + urlfiller + 'redirect_uri=' + landingURL;