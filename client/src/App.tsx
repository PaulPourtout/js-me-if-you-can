import * as React from "react";
import "./App.css";
import styled from "styled-components";
import { CodeEditor } from "./ui/pages/CodeEditor";
import { PageNotFound } from "./ui/pages/PageNotFound";
import { Home } from "./ui/pages/Home";
import { KatasList } from "./ui/pages/KatasList";
import { Route, Switch } from "react-router-dom";
import { LoginPage } from "./ui/pages/LoginPage";
import { Header } from "./ui/components/Header";
import {Dashboard} from "./ui/pages/Dashboard";
import {history} from "./Router";
import { SignupPage } from "./ui/pages/SignupPage";
import { AccountPage } from "./ui/pages/AccountPage";
import {KataSolutions} from "./ui/pages/KataSolutions";
import {PrivateRoute, createPathUrl} from "./utils/PrivateRoute";
import { KataPage } from "./ui/pages/KataPage";
import {SeriesList} from "./ui/pages/SeriesList";
import {SeriePage} from "./ui/pages/SeriePage";
import { CreateKata } from "./ui/pages/CreateKata";
import { AdminBoard } from "./ui/pages/AdminBoard";
import { CreateSerie } from "./ui/pages/CreateSerie";


export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <Container>
        {
          (history.location.pathname !== "/") &&
          <Header/>
        }
        <Switch >
          <Route exact={true} path={createPathUrl("/")} component={Home} />
          <Route path={createPathUrl("/login")} component={LoginPage} />
          <Route path={createPathUrl("/signup")} component={SignupPage} />
          <Route path={createPathUrl("/editor/:mode/:kataOrSerieId")} component={CodeEditor} />
          <PrivateRoute path={createPathUrl("/kataslist")} component={KatasList} />
          <PrivateRoute path={createPathUrl("/serieslist")} component={SeriesList} />
          <PrivateRoute path={createPathUrl("/dashboard")} component={Dashboard} />
          <PrivateRoute path={createPathUrl("/account")} component={AccountPage} />
          <PrivateRoute path={createPathUrl("/kata/:kataId")} component={KataPage}/>
          <PrivateRoute path={createPathUrl("/serie/:serieId")} component={SeriePage}/>
          <PrivateRoute path={createPathUrl("/admin/kata/:id")} new={true} component={CreateKata} />
          <PrivateRoute path={createPathUrl("/admin/serie/:id")} new={true} component={CreateSerie} />
          <PrivateRoute path={createPathUrl("/admin")} new={true} component={AdminBoard} />
          <Route component={PageNotFound} />
        </Switch>
      </Container>
    );
  }
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
