import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import TeacherList from './pages/TeacherList';
import TeachForm from './pages/TechForm';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/signin" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/" exact component={Landing} />
      <Route path="/study" exact component={TeacherList} />
      <Route path="/give-classes" exact component={TeachForm} />
    </BrowserRouter>
  );
};

export default Routes;
