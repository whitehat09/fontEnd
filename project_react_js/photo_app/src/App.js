//import { unwrapResult } from '@reduxjs/toolkit';
//import productApi from 'api/productApi';
//import { getMe } from 'app/userSlice';
//import SignIn from 'features/Auth/pages/SignIn';
//import firebase from 'firebase';
import React, { Suspense, useEffect, useState } from "react";
//import { useDispatch } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
//import { Button } from 'reactstrap';
//import "./App.scss";
import Header from "./components/Header";
import NotFound from "./components/NotFound";

// Lazy load - Code splitting
const Photo = React.lazy(() => import("./features/Photo"));

function App() {
  return (
    <div className="photo-app">
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          <Header />

          {/* <Button onClick={handleButtonClick}>Fetch Product List</Button> */}

          <Switch>
            <Redirect exact from="/" to="/photos" />

            <Route path="/photos" component={Photo} />
            <Route path="/sign-in" component={SignIn} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
