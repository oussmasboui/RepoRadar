import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from '../components/Header/Header';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import { RepositoriesPage } from '../pages/ProfilePage/profilePageStyles';
import GlobalStyles from '../styles/GlobalStyles';

export const Router: FC = () => {
  
  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/' element={<ProfilePage />} />
          <Route path='/:username' element={<ProfilePage />} />
          <Route path='/:username/:reponame' element={<RepositoriesPage />} />
        </Routes>
        <GlobalStyles />
      </BrowserRouter>
  );
};