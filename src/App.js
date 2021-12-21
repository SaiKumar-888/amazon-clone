import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import React, { useState, useEffect } from 'react';
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import Payment from "./Payment";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'

const promise = loadStripe("pk_test_51K8nZ6SBOip5bBXbq5kaZIgr2rbVHHoekGlIDkD1AgTBwnNiVYeYIC3tnInIrjwVIn4ioi1pwFrZNnZaFQKwcp8300nu8rNkFa");

function App() {
  const [{} , dispatch] = useStateValue();
useEffect(() => {
  // will only run once when the app component loads...

  auth.onAuthStateChanged((authUser) => {
    console.log("THE USER IS >>> ", authUser);

    if (authUser) {
      // the user just logged in / the user was logged in

      dispatch({
        type: "SET_USER",
        user: authUser,
      });
    } else {
      // the user is logged out
      dispatch({
        type: "SET_USER",
        user: null,
      });
    }
  });
}, []);
  return (
    <Router>
      <div className="App">
        
        <Switch>

          <Route path="/checkout">
          <Header />
            <Checkout />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
            <Payment/>
            </Elements>
          </Route>

          <Route exact path="/">
          <Header />
            <Home />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
