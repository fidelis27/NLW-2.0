import React from 'react';
import { Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import TeacherList from '../pages/TeacherList';
import TeachForm from '../pages/TechForm';

const AuthRoutes: React.FC = () => {
  return (
    <>
      <Route path="/" exact component={Landing} />
      <Route path="/study" component={TeacherList} />
      <Route path="/give-classes" component={TeachForm} />
    </>
  );
};

export default AuthRoutes;
