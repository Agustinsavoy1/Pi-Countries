import { BrowserRouter, Route } from "react-router-dom";
import React from "react";
import "./index.css";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Card from "./components/Card";
import AddActivity from "./components/AddActivity";
import Nav from "./components/Nav";
import Contact from "./components/Contact";
import Table from "./components/Table";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/countries" component={Home} />
      <Route exact path="/countries/:id" component={Card} />
      <Route exact path="/activity" component={AddActivity} />
      <Route exact path="/table" component={Table} />
      <Route exact path="/contact" component={Contact} />
    </BrowserRouter>
  );
}

export default App;
