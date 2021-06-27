import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import BookDetailsPage from '../pages/BookDetailsPage';
import EditBookPage from '../pages/EditBookPage';

const BooksRouter = () => {
  let { path } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={path} component={BookDetailsPage} />
      <Route path={`${path}/edit`} component={EditBookPage} />
    </Switch>
  );
}

export default BooksRouter;