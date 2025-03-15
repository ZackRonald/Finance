import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './index.css'
import Login from '../Pages/Login.jsx'
import Home from '../Pages/Home.jsx'
import SignUp from '../Pages/SignUp.jsx'
import ExpManager from '../Pages/Expmanager.jsx'
import ExpTracker from '../Pages/ExpTracker.jsx'
import Article from '../Pages/Article.jsx'
import Support from '../Pages/Support.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path='/login' element={<Login />} /> 
    <Route path='/signup' element={<SignUp />} /> 
    <Route path='/home' element={<Home/>}/>
    <Route path='/EM' element={<ExpManager/>}/>
    <Route path='/ET' element={<ExpTracker/>}/>
    <Route path='/Article' element={<Article/>}/>
    <Route path='/Support' element={<Support/>}/>
  </Routes>
  </BrowserRouter>
)
