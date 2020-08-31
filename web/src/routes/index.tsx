import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Landing from '../pages/Landing';
import TeacherList from '../pages/TeacherList';
import TeachForm from '../pages/TechForm';
import Profile from '../pages/Profile';
import ErrorAuth from '../pages/ErrorAuth';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/landing" exact component={Landing} isPrivate />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/study" component={TeacherList} isPrivate />
      <Route path="/give-classes" component={TeachForm} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/error" component={ErrorAuth} />
    </Switch>
  );
};

export default Routes;
