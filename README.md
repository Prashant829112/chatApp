-> web development

-> 1. create frontend through which user interacts & can input data, if user's data is not required to be stored then website is done
-> 2. if user's data is needed to be stored, create a database to store data
-> 3. transfer of data from frontend to database & vice-versa is done through APIs which are links
-> 4. creation of these API links is done in backend development 

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
-> flow
-> create store -> createStore(reducer) -> reducer is called & default value retured by the reducer is stored in store as initial state
-> from component or anywhere dispatch(action) is called -> if any event occurs, dispatch() can be called
-> reducer receives the action & state & it returns the new state after performing the fn & the new state is stored in the store as current value
-> the new state can be accessed using useSelector() in the components

-> redux-toolkit -> toolset to write redux logic in a standardized way for efficient redux developmemt
-> flow
-> createSlice() -> contains reducer functions & actions are automatically created
-> configureStore() -> creates store that stores all the reducers 
-> giving access of store to react using Provider
-> UI button click -> useDispatch(action) -> createSlice() reducer fn run -> state update -> redux store stores new state -> useSelector() provides state value to components -> updated UI

-> react-redux -> official binding library that connects React components with Redux store -> gives access to Provider, useSelector(), useDispatch()

-> go to redux toolkit site -> get started -> installation -> npm install @reduxjs/toolkit -> npm install react-redux 
-> on redux toolkit site, go to Quick start -> follow the documentatn using js

-> general redux reducer fns do not support asynchronous behaviour -> redux thunk is used 
-> create new file user.thunk.js
-> on the site of redux toolkit -> search createAsyncThunk -> follow the documentatn

-> createAsyncThunk('action_name',async ()=>{}) -> helps to perform asynchronous fns (handling API calls)
-> extraReducers -> section of reducers that handle async(createAsyncThunk) calls
-> flow
-> component -> dispatch(action_name()) -> thunk runs -> API is called -> redux toolkit dispatches action_name.pending, action_name.fulfilled & action_name.rejected -> extraReducers handles the three calls -> new state updated -> UI auto refresh

-> design home page
-> inside home folder, create UserSidebar.jsx & MessageContainer.jsx 
-> design these containers using daisyUI components & react icons -> search for input, button, AVATAR, chat bubble, etc on daisyUI 
-> inside these components create & use other components Message.jsx & User.jsx

-> go to server -> README.md

-> implement toast -> got to site react hot toast
-> npm i react-hot-toast -> use required <Toaster/> from site

-> axios -> a js library that helps to interact between frontend & backend -> npm i axios 
-> inside src, create folder components -> inside components, create utilities folder -> inside utilities, create axiosInstance.js -> use it in user.thunk.js
-> go to server to install CORS
-> flow
-> user clicks login button -> handleLogin() calls loginUserThunk(loginData_ie_{username,password}) -> axiosInstance.post('URL',{}) goes to URL & posts loginData on server -> when success response is achieved, redux store updates -> UI changes through useSelector()

-> NOTE -> useEffect() runs only if the component/fn in which it is written is mounted

-> create ProtectedRoutes.jsx inside components folder to keep <Home/> page protected from unauthorised requests

-> create message.thunk.js in store & in slice folder, create message.slice.js

-> create User.jsx & SendMessage.jsx inside folder home 

-> npm i socket.io-client
-> inside slice folder, create socket.slice.js





-> steps (backend)

-> open terminal with chatApp as current folder -> cd server -> 
-> npm init -y -> npm i express -> npm i mongoose 
-> type:"commonjs" won't be used, instead "module" will be used -> no require() & module.exports
-> package.json -> set type:"module" -> import/export
-> create file server.js -> replace "index.js" with "server.js" in "main"
-> create folders controllers, middlewares, models, routes & .js files inside them 
-> create file user.controller.js inside controllers
-> set up server running mechanism -> 
-> npm i nodemon -D -> installed as dev dependency -> only for development purpose, no use for production  
-> nodemon added in devDependencies in package.json -> add "dev":"nodemon server.js" inside "scripts", also replace "index.js" with "server.js" in "main"
-> npm run dev 
-> create models(Schema) -> create three models -> user.model.js, message.model.js & conversation.model.js

-> establish connection
-> go to site MongoDB Atlas -> login (with google) -> if the app needs to be deployed, atlas is used & compass is used for creating & accessing DB on local machine
-> cluster on atlas is a host of the databases inside it -> cluster -> databases -> collections -> documents
-> we can have multiple databases inside a cluster or for new project, a new cluster can be created -> but one cluster has been created & for a new cluster, paid services
-> npm i dotenv -> create .env file -> this contains mongoDb_uri which is provided when cluster is created & should be kept for adding more dbs to the cluster
-> URI-> mongodb+srv://<username>:<password>@cluster_Name.mongodb.net/db_name... 
-> here, no db name has been given -> default mongoose points to the cluster location & when any model is saved, a db is created by the name "test" inside which the model is present as connection 
-> if a new db needs to be created -> mongoose.connect(mongodb+srv://<username>:<password>@cluster_Name.mongodb.net/newDBName) -> when a model will be saved, this newDB will be shown on atlas with the model as connection

-> create folder db -> create connection1.db.js -> since, model User has been imported on user.controller.js which is running login server, connection "users" is added inside "test" db automatically 

-> create folder utilities -> utility contains helper fns
-> while writing logic in user.controller.js, error handling is required -> THUNDER client in VS code is useful tool as it gives responses on the screen when input is provided in JSON or any other format for a particular URL

-> error handling 
-> create error.Middleware.js
-> create asyncHandler.utility.js handles async behaviour errors without using tryCatch
-> flow 
-> asyncHandler(controllerFn) -> controllerFn(req,res,next) runs a Promise -> if controllerFn() runs smoothly, done -> else, .catch(next) -> next(err) -> Express errorMiddleware in server -> res.json(ErrorObject)

-> NOTE -> next() -> express calls next middleware -> next(arg) -> express sends arg to errorMiddleware

-> create errorHandler.utility.js
-> flow 
-> client -> route -> controller -> next(errorObjectThrough_errorHandler_class) -> express passes error to errorMiddleware -> sends JSON response
-> if custom errorMiddleware is not created(like for asyncHandler()), express will send its default built-in error-handling middleware -> server 500 Internal error, with a basic error message or stack trace

-> for password protection, use bcryptjs -> npm i bcryptjs
-> use jwt for user authentication -> npm i jsonwebtoken
-> create auth.middleware.js -> which will check whether the user is authenticated or not
-> flow 
-> user login/register -> generate token(jwt.sign()) & set in cookie(res.cookie()) -> client sends req through route(/get-profile) -> server reads token(req.cookies.) -> server verifies token(jwt.verify()) -> if valid -> user info in req.user -> route uses req.user. to access data  

-> create message.controllers.js & message.route.js
-> NOTE -> refer to models created to get clarity regarding controllers

-> go to client

-> CORS -> Cross-Origin Resource Sharing -> a security feature that controls whether a website can fetch data from a different website -> used bcz frontend & backend run on different sites
-> npm i cors -> use it in server.js -> go back to client

-> real time working of website
-> there are multiple ways to make a website work on real time basis : server sent events(SSE), realtime backend services (BaaS/PaaS), Long Polling, Short Polling, WebSockets, Socket.IO 
-> all these methods are implemented by adding a peice of code to the original code

-> Short Polling -> Client(browser) sends requests to server again and again after every 1 or 2 sec, if server has a new res, it sends, else empty res is sent
-> Long Polling -> Client sends a req, server waits till a new message comes, the moment a new message arrives, res is sent by server , then client again sends a new req 
-> both methods create a new connection after every message -> not good

-> socket.io
-> a JS lirary that allows a real time communciation between your client(browser) and server through which changes are visible to ther users without refresh
-> socket.io uses : webSockets for real time two way connection , if webSocket fails (due to old browser or firewall), it falls back to long polling
-> npm i socket.io 
-> go to client to install socket.io for frontend
-> socket=io("server_url") -> written on client side on -> sends a connection req to the server -> if connection req is accepted on server, socket stores a "socket-object" which represents client-server connnection & acts as a connection instance ,ie it can be used to .emit or receive(.on)
-> io.on("connection",(socket)=>{}) -> wriiten on server -> accepts the connection req sent by client & client-server connection is established, a socket.id is generated which is unique id for the that particular connection
-> socket.emit("send-message",msg) -> if written on client side, sends msg to server through event "send-message" & vice-versa
-> socket.on("send-message",(msg)=>{}) -> if written on client side, receives msg from server side which was sent through socket.emit("send-message",msg) & vice-versa
-> io.emit('userJoined','msg') -> written on server only(all io fn are written on server only)-> sends msg to every connected client of that server if socket.on('userJoined',(data)=>{}) has been written on client side
-> io.to(socket.id).emit('newMsg',msg) -> written on server -> sends msg to connection(client) whose socket.id is inside .to()
-> socket.on('disconnect') -> 'disconnect' is an inbuilt event for which .emit('disconnect') need not be written -> it is called automatically when : socket.close() is called or app is closed or internet issue or page reload 

-> create socket.js 
