import React from 'react';
import { Route } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Landing from '../pages/Landing';
import TeacherList from '../pages/TeacherList';
import TeachForm from '../pages/TechForm';
import Profile from '../pages/Profile';
import ErrorAuth from '../pages/ErrorAuth';

const AppRoutes: React.FC = () => {
  return (
    <>
      <Route path="/" exact component={SignIn} />
      <Route path="/landing" exact component={Landing} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/study" component={TeacherList} />
      <Route path="/give-classes" component={TeachForm} />
      <Route path="/profile" component={Profile} />
      <Route path="/error" component={ErrorAuth} />
    </>
  );
};

export default AppRoutes;
