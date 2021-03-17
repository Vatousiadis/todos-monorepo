# todos-monorepo
This is a simple Todo-List application, as a fullstack project in a mono-repo,
deployed using heroku's free services

To run the app on the heroku deployment you can use the link below
https://sleepy-crag-53535.herokuapp.com/
(you might need to reload, to get both back-end and front-end apps running)

In addition if you wish to run the app localy and preview/change code,
-clone the repo to your machine
-in todos-monorepo\packages\client\.env do the following change:
  *delete REACT_APP_ENV='PROD'
  * add REACT_APP_ENV='DEV'
-in terminal do yarn
-use the following command to run : lerna run start

Enjoy :)
