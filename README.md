Welcome to the JIRA Shuttle Bus Management Web Application
==========================================================

This web application leverages the back-end JIRA Shuttle Bus Management platform APIs to provide customised UI-based services for the platform users.

Web Application Structure
-----------

The application provides the following pages. All pages, except the Welcome page, are only accessible post user login.

* Welcome page - Links for SignUp and SignIn.

URL: https://2qbdm0akjg.execute-api.ap-southeast-1.amazonaws.com/Prod

* SignUp page - Cognito User Pool built-in SignUp page

Upon successful signup, user will receive a verification email at the email address provided. User need to click this link to verify their email address, before logging into the system.

URL: https://jiracorp.auth.ap-southeast-1.amazoncognito.com/signup?response_type=token&client_id=u43f2tl674qh6guik00elvini&redirect_uri=https://2qbdm0akjg.execute-api.ap-southeast-1.amazonaws.com/Prod/landing

* SignIn page - Cognito User Pool built-in SignIn page

URL: https://jiracorp.auth.ap-southeast-1.amazoncognito.com/login?response_type=token&client_id=u43f2tl674qh6guik00elvini&redirect_uri=https://2qbdm0akjg.execute-api.ap-southeast-1.amazonaws.com/Prod/landing

* Landing page - For first time user login, this page will provide the choice to user to select the user role in the system. For subsequent logins, this page is a simple redirect to the Home page.

Roles available are:
  - Bus Operator
  - Service Provider
  - Passenger

For Service Provider role selection, the type of Service Provider needs to be selected as well. Choices are:
  - Condo
  - Organisation
  - School
  - Shopping Mall
  - University

URL: https://2qbdm0akjg.execute-api.ap-southeast-1.amazonaws.com/Prod/landing

* Home page - This page provides links to all the various services available to the user, based on the user role.
Common services for all users:
  - View Profile
  - Search Routes

Bus Operator services:
  - Manage Routes (currently a dummy link, as functionality is not added)

Passenger services:
  - Tag Service Providers

URL: https://2qbdm0akjg.execute-api.ap-southeast-1.amazonaws.com/Prod/homepage

* View Profile page - This page displays the profile details for the logged in user.

URL: https://2qbdm0akjg.execute-api.ap-southeast-1.amazonaws.com/Prod/profilemgmt

* Search Routes page - This page displays the list of routes linked with the user's profile. There are filters available narrowing the search criteria.

URL: https://2qbdm0akjg.execute-api.ap-southeast-1.amazonaws.com/Prod/routesearch

* Tag Service Providers page - This page is specific to a Passenger user.

It has 3 sections:
  - List of Service Providers already tagged to the Passenger profile
  - Selection of Service Providers that can be tagged newly to the profile
  - Selection of Service Providers that can be untagged from the profile

URL: https://2qbdm0akjg.execute-api.ap-southeast-1.amazonaws.com/Prod/sptagging

Implementation Details
------------------

All the pages in the application are HTML/CSS/JS-based, accessible through individual serverless AWS Lambda functions, invoked through the AWS API Gateway. The application is hosted in the AWS Singapore region.
