-> web development

-> 1. create frontend through which user interacts & can input data, if user's data is not required to be stored then website is done
-> 2. if user's data is needed to be stored, create a database to store data
-> 3. transfer of data from frontend to database & vice-versa is done through APIs which are links
-> 4. creation of these API links is done in backend development 

<<<<<<< HEAD
=======
-> steps (completely handwritten while creating the application to track the workflow)

create folder chatApp -> inside it create two new folders client & server


-> frontend setup
-> cd client in terminal -> in client -> 
go to tailwind.css site -> v.3.4.17 -> docs -> framework guides -> vite -> follow the installation using react ->
remove unwanted files, folders and codes from the pre-installed react app -> sometimes .vite folder is asked to be deleted if npm run dev is called -> delete it from node_modules ->
add one more terminal to install "daisyui" ->
go to daisyUI site -> how to use -> npm i -D daisyui@latest -> for plugins -> go to tailwind.config.js ->
add require("daisyui") inside plugins -> now you can use daisyUI components -> add daisyui theme -> 
daisyui: {
    themes: ["light", "dark", "cupcake","bumblebee"],
  },
-> add this in tailwind.config.js
-> create folder pages -> folder authentication & folder home
-> // always name react components with capital first letter -> react accepts component names in that way only 
-> inside authentication -> create Login.jsx & Signup.jsx pages -> rafce -> enter
-> inside home -> create home.jsx page
-> create router in main.jsx
-> design login and signup pages using daisyUI components -> search for input, button, etc to get components
-> use react-icons for icons instead of svg -> remove svg tag from the daisyUI HTML code
->npm i react-icons -> go to react icons site or github site -> pick any icon -> you will get import code & component of that icon
-> now use useState hook to take input data from the user to access the login and signup input

-> complete redux theory 
-> redux -> js library to manage state on application level
-> store -> stores all the states of the app
-> action -> js object that tells the action to be performed 
-> reducer -> fn that performs that particular action and VERY INPORTANTLY RETURNS STATE 
>>>>>>> 16be65f39917e1f0dab3cec79670a210845b7534
-> flow
-> frontend consists of 3 pages(login, signup and home). User initially lands on the login page from where can login 
using Username and Password. For the first time, can go to the signup page and signup using Username, Name, gender, password.
-> On the home page, can see all the users of the app and who among them are online on the left hand side
-> once he clicks on any person's name, his conversation with that person will open on right hand side. For this, I have created API that gets converstation data from database.
-> if the user sends a message, that message will be posted on the database for which I have created API
-> Apart from this, I have done authentication using JWT token, password encryption, route protection so that a user on home page cannot accesslogin/signup page without Logout, automatic avatar generation, etc

 
