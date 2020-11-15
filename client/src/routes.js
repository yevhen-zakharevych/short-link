import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { CreateLinkPage } from './pages/CreateLinkPage';
import { DetailLinkPage } from './pages/DetailLilnkPage';
import { LinksPage } from './pages/LinksPage';

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/links" exact>
          <LinksPage />
        </Route>
        <Route path="/create-link" exact>
          <CreateLinkPage />
        </Route>
        <Route path="/link-details/:id">
          <DetailLinkPage />
        </Route>
        <Redirect to="/create-link" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/">
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
};
