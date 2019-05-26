Welcome to the JIRA Shuttle Bus Management Web Application
==========================================================

This web application leverages the back-end JIRA Shuttle Bus Management platform APIs to provide customised UI-based services for the platform users.

Web Application Structure
-----------

The application provides the following pages. All pages, except the Welcome page, are only accessible post user login.

### [Welcome page](https://2qbdm0akjg.execute-api.ap-southeast-1.amazonaws.com/Prod) ###
Links for SignUp and SignIn.

### [SignUp page](https://jiracorp.auth.ap-southeast-1.amazoncognito.com/signup?response_type=token&client_id=u43f2tl674qh6guik00elvini&redirect_uri=https://2qbdm0akjg.execute-api.ap-southeast-1.amazonaws.com/Prod/landing) ###
Cognito User Pool built-in SignUp page

Upon successful signup, user will receive a verification email at the email address provided. User need to click this link to verify their email address, before logging into the system.

### [SignIn page](https://jiracorp.auth.ap-southeast-1.amazoncognito.com/login?response_type=token&client_id=u43f2tl674qh6guik00elvini&redirect_uri=https://2qbdm0akjg.execute-api.ap-southeast-1.amazonaws.com/Prod/landing) ###
Cognito User Pool built-in SignIn page

### [Landing page](https://2qbdm0akjg.execute-api.ap-southeast-1.amazonaws.com/Prod/landing) ###
For first time user login, this page will provide the choice to user to select the user role in the system. For subsequent logins, this page is a simple redirect to the Home page.

Roles available are:
  - Bus Operator
  - Service Provider: For Service Provider role selection, the type of Service Provider needs to be selected as well
    - Condo
    - Organisation
    - School
    - Shopping Mall
    - University
  - Passenger

### [Home page](https://2qbdm0akjg.execute-api.ap-southeast-1.amazonaws.com/Prod/homepage) ###
This page provides links to all the various services available to the user, based on the user role. For first time user login, this page also adds the user profile in the back-end database, based on details returned by Cognito.

  - Common services for all users:
    - View Profile
    - Search Routes

  - Bus Operator services:
    - Manage Routes (currently a dummy link, as functionality is not added)

  - Passenger services:
    - Tag Service Providers

### [View Profile page](https://2qbdm0akjg.execute-api.ap-southeast-1.amazonaws.com/Prod/profilemgmt) ###
This page displays the profile details for the logged in user.

### [Search Routes page](https://2qbdm0akjg.execute-api.ap-southeast-1.amazonaws.com/Prod/routesearch) ###
This page displays the list of routes linked with the user's profile. There are filters available narrowing the search criteria.

### [Tag Service Providers page](https://2qbdm0akjg.execute-api.ap-southeast-1.amazonaws.com/Prod/sptagging) ###
This page is specific to a Passenger user.

It has 3 sections:
  - List of Service Providers already tagged to the Passenger profile
  - Selection of Service Providers that can be tagged newly to the profile
  - Selection of Service Providers that can be untagged from the profile

Implementation Details
------------------

Please refer to the [Platform API Documentation](https://8m1adn9t35.execute-api.ap-southeast-1.amazonaws.com/Prod) for complete reference of all platform APIs available.

All the pages in the application are HTML/CSS/JS-based, accessible through individual serverless AWS Lambda functions, invoked through the AWS API Gateway. The application is hosted in the AWS Singapore region.

Caching of data across pages is only done via the HTML Session Storage, and is available as long as the session is active.

The following back-end platform APIs are used to implement the front-end functionality.

### Landing page ###

  - Retrieve user profile (needs JWT token from login)

    GET [/profilemgmt/-/{UserId}](https://8m1adn9t35.execute-api.ap-southeast-1.amazonaws.com/Prod/profilemgmt/-/{UserId})

    GET Request Header (JSON):
      ```json
      {
          "Authorization": idToken  // JWT ID Token provided by Cognito User Pool upon login
      }
      ```

  - Retrieve list of user roles (first time login)
    
    GET [/miscsvcs/userroles](https://8m1adn9t35.execute-api.ap-southeast-1.amazonaws.com/Prod/miscsvcs/userroles)

  - Retrieve list of Service Providers types (first time login)
    
    GET [/miscsvcs/svcprtypes](https://8m1adn9t35.execute-api.ap-southeast-1.amazonaws.com/Prod/miscsvcs/svcprtypes)

### Home page ###

  - Create user profile (first time login, needs JWT token from login)
    
    POST [/profilemgmt](https://8m1adn9t35.execute-api.ap-southeast-1.amazonaws.com/Prod/profilemgmt)

    POST Request Header (JSON):
      ```json
      {
          "Authorization": idToken  // JWT ID Token provided by Cognito User Pool upon login
      }
      ```

    POST Request Body (JSON):
      ```json
      {
          "UserId": userid,
          "UserRole": userrole,
          "SvcPrType": svcprtype,
          "UserName": username,
          "UserDOB": userdob,
          "UserPhone": userphone,
          "UserEmail": useremail,
          "UserAddress": useraddress,
          "CreatedBy": "sbmpsignup"
      }
      ```

### View Profile page ###

  - Retrieve user profile (only if not found in Session Storage, needs JWT token from login)
    
    GET [/profilemgmt/-/{UserId}](https://8m1adn9t35.execute-api.ap-southeast-1.amazonaws.com/Prod/profilemgmt/-/{UserId})

    GET Request Header (JSON):
      ```json
      {
          "Authorization": idToken  // JWT ID Token provided by Cognito User Pool upon login
      }
      ```

### Search Routes page ###

  - Retrieve routes linked to profile
    
    POST [/routesearch](https://8m1adn9t35.execute-api.ap-southeast-1.amazonaws.com/Prod/routesearch)

    POST Request Body (JSON):
      ```json
      {
          "Format": "-",
          "UserRole": userrole,
          "UserId": userid
      }
      ```

### Tag Service Providers page ###

  - Retrieve list of Service Providers
    
    GET [/miscsvcs/svcproviders/-/-/-](https://8m1adn9t35.execute-api.ap-southeast-1.amazonaws.com/Prod/miscsvcs/svcproviders/-/-/-)

  - Retrieve list of tagged Service Providers
    
    GET [/sptagging/-/{PassengerUserId}](https://8m1adn9t35.execute-api.ap-southeast-1.amazonaws.com/Prod/sptagging/-/{PassengerUserId})

  - Add Service Provider tagging (needs JWT token from login)
    
    POST [/sptagging](https://8m1adn9t35.execute-api.ap-southeast-1.amazonaws.com/Prod/sptagging)

    POST Request Header (JSON):
      ```json
      {
          "Authorization": idToken  // JWT ID Token provided by Cognito User Pool upon login
      }
      ```

    POST Request body (JSON):
      ```json
      {
          "PassengerUserId": userid,
          "SvcPrId": svcprid,
          "CreatedBy": "sbmpsptagging"
      }
      ```

  - Remove Service Provider tagging (needs JWT token from login)
    
    DELETE [/sptagging](https://8m1adn9t35.execute-api.ap-southeast-1.amazonaws.com/Prod/sptagging)

    DELETE Request Header (JSON):
      ```json
      {
          "Authorization": idToken  // JWT ID Token provided by Cognito User Pool upon login
      }
      ```

    DELETE Request body (JSON):
      ```json
      {
          "PassengerUserId": userid,
          "SvcPrId": svcprid
      }
      ```
