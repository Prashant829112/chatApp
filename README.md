-> web development

-> 1. create frontend through which user interacts & can input data, if user's data is not required to be stored then website is done
-> 2. if user's data is needed to be stored, create a database to store data
-> 3. transfer of data from frontend to database & vice-versa is done through APIs which are links
-> 4. creation of these API links is done in backend development 

-> flow
-> frontend consists of 3 pages(login, signup and home). User initially lands on the login page from where can login 
using Username and Password. For the first time, can go to the signup page and signup using Username, Name, gender, password.
-> On the home page, can see all the users of the app and who among them are online on the left hand side
-> once he clicks on any person's name, his conversation with that person will open on right hand side. For this, I have created API that gets converstation data from database.
-> if the user sends a message, that message will be posted on the database for which I have created API
-> Apart from this, I have done authentication using JWT token, password encryption, route protection so that a user on home page cannot accesslogin/signup page without Logout, automatic avatar generation, etc 

 
