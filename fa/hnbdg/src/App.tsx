import React from "react";
import { Route, Switch } from "react-router-dom";

import Footer from "./layout/Footer";
import Header from "./layout/Header";
import ScrollToTop from "./layout/ScrollToTop";
import Article from "./page/Article";
import Editor from "./page/Editor";
import Home from "./page/Home";
import Login from "./page/Login";
import NotFound from "./page/NotFound";
import Profile from "./page/Profile";
import Register from "./page/Register";
import Setting from "./page/Setting";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/settings" component={Setting} />
        <Route exact path="/editor" component={Editor} />
        <Route path="/editor/:article_slug" component={Editor} />
        <Route path="/article/:article_slug" component={Article} />
        <Route path="/profile/:username" component={Profile} />
        <Route path="/profile/:username/favorites" component={Profile} />
        <Route component={NotFound} />
      </Switch>
      <ScrollToTop />
      <Footer />
    </>
  );
}
export default App;
