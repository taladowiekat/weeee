import logo from './logo.svg';
import './App.css';
import Sidenav from './components/Sidenav.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Setting from './components/Setting.js';
import Home from './components/Home.js';
import About from './components/About.js';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/about" exact element={<About/>} />
          <Route path="/setting" exact element={<Setting/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

