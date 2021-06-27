import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import BooksPage from '../pages/BooksPage';
import UploadBookPage from '../pages/UploadBookPage';
import BooksRouter from '../containers/BooksRouter';

const BooksContainer = () => {
  let { path } = useRouteMatch("/admin/books");

  return (
    <Switch>
      <Route path={path} exact component={BooksPage} />
      <Route path={`${path}/upload`} component={UploadBookPage} />
      <Route path={`${path}/:id`} component={BooksRouter} />
    </Switch>
  );
}

export default BooksContainer;