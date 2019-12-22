import React, { Fragment } from "react";
// import "./App.scss";
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";
import Home from "./components/Home";
import Forums from "./components/Forums";
import Discussions from "./components/Discussions";
import CreateDiscussion from "./components/CreateDiscussion";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Switch from "react-router-dom/Switch";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { create } from "jss";
import rtl from "jss-rtl";

const theme = createMuiTheme({
  direction: "rtl"
});

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function App() {
  return (
    <Router>
      <div className="container">
        <StylesProvider jss={jss}>
          <ThemeProvider theme={theme}>

            <Header />

            <Switch>
              <Route exact path="/" component={LoginForm} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/forums" component={Forums} />
              <Route exact path="/forum/:forumId" component={Discussions} />
              <Route exact path="/forum/:forumId/createDiscussion" component={CreateDiscussion} />
            </Switch>
          </ThemeProvider>
        </StylesProvider>
      </div>
    </Router>
  );
}

export default App;
