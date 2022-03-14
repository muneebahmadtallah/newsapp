import React, { Component } from 'react';
import Navbar from './Navbar';
import News from './News';
import {BrowserRouter, Routes, Route,} from 'react-router-dom';

export class Routing extends Component {
  render() {
    
    return (
        <>
        {/* version 6 react router */}
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={
        <News  key="general" pageSize={20} category={"general"} country={"us"}/>
        }/>
        <Route exact path='/business' element={
        <News  key="business" pageSize={20} category={"business"} country={"us"}/>
        }/>
        <Route exact path='/entertainment' element={
        <News  key="entertainment" pageSize={20} category={"entertainment"} country={"us"}/>
        }/>
        <Route exact path='/general' element={
        <News  key="general" pageSize={20} category={"general"} country={"us"}/>
        }/>
        <Route exact path='/health' element={
        <News  key="health" pageSize={20} category={"health"} country={"us"}/>
        }/>
        <Route exact path='/science' element={
        <News  key="science" pageSize={20} category={"science"} country={"us"}/>
        }/>
        <Route exact path='/sports' element={
        <News  key="sports" pageSize={20} category={"sports"} country={"us"}/>
        }/>
        <Route exact path='/technology' element={
        <News  key="technology" pageSize={20} category={"technology"} country={"us"}/>
        }/>
      
      </Routes>
      </BrowserRouter>
    </>
    )
  }
}

export default Routing