import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import BooksPage from '../pages/BooksPage';
import UploadBookPage from '../pages/UploadBookPage';

const BooksContainer = () => {
  let { path } = useRouteMatch("/admin/books");

  console.log(path);
  return (
    <Switch>
      <Route path={path} exact component={BooksPage} />
      <Route path={`${path}/upload`} component={UploadBookPage} />
    </Switch>
  );
}

export default BooksContainer;