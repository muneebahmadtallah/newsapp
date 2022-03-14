import React, {useState} from 'react';
import Navbar from './Navbar';
import News from './News';
import {BrowserRouter, Routes, Route,} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

const App = () => {
    const [progress, setProgress] = useState(0)
    return (
      <>
        
      <BrowserRouter>
      <Navbar/>
      <LoadingBar
      height={3}
      color='red'
      progress={progress}/>
      <Routes>
        <Route exact path='/' element={
        <News setProgress={setProgress} key="general" pageSize={20} category={"general"} country={"us"}/>
        }/>
        <Route exact path='/business' element={
        <News setProgress={setProgress} key="business" pageSize={20} category={"business"} country={"us"}/>
        }/>
        <Route exact path='/entertainment' element={
        <News setProgress={setProgress} key="entertainment" pageSize={20} category={"entertainment"} country={"us"}/>
        }/>
        <Route exact path='/general' element={
        <News setProgress={setProgress} key="general" pageSize={20} category={"general"} country={"us"}/>
        }/>
        <Route exact path='/health' element={
        <News setProgress={setProgress} key="health" pageSize={20} category={"health"} country={"us"}/>
        }/>
        <Route exact path='/science' element={
        <News setProgress={setProgress} key="science" pageSize={20} category={"science"} country={"us"}/>
        }/>
        <Route exact path='/sports' element={
        <News setProgress={setProgress} key="sports" pageSize={20} category={"sports"} country={"us"}/>
        }/>
        <Route exact path='/technology' element={
        <News setProgress={setProgress} key="technology" pageSize={20} category={"technology"} country={"us"}/>
        }/>
      
      </Routes>
      </BrowserRouter>
</>
    )
  }

export default App