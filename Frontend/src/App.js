import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
//import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';


import Home from './js/Home.js';
import SignIn from './js/SignIn.js';
import SignUp from './js/SignUp.js';
import Landing from './js/Landing.js';
import Contact from './js/Contact.js';
import Profile from './js/Profile.js';
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000/"


const App = () => {
 return (
    <>
	  <HashRouter>

       <Routes>
          <Route path="/" element={<Landing />} />
		  <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
	<Route path="/contact" element={<Contact />} />
	<Route path="/profile" element={<Profile />} />
	
       </Routes>
	     </HashRouter>


    </>
 );
};

export default App;

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
