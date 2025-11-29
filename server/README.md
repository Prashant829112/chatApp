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
-> flow
-> in client//socket.js, socket=io("server_url") sends connection req to server -> in server//socket.js, io.on("connection",(socket)=>{}) receives the connection req and establishes a connection, a unique socketId is generated for this connection -> socket.emit("add_user", userId) in client sends userId to backend -> socket.on("add_user", userId=>{}) on server receives userId and maps it to the generated socketId -> user clicks on a chat -> messages are retrieved using REST APIs -> user sends a message -> REST APIs post it on backend -> in client socket.emit("send_message",messageData) is called sending message to backend -> backend broadcasts the message to all connected users (this should be changed and sent to only the receiverId of the message)
