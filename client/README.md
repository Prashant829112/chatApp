# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

-> steps

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