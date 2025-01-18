import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';

import UsuarioTable from './pages/Profile/page';

import Home from './pages/Dashboard/Home';

import RegisterOffice from './pages/Springboard To Wealth/page';

import SpringboardCalculator from './pages/Springboard To Wealth/page';
import TableDisplay from './pages/Springboard To Wealth/page';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Springboard To Wealth" />
              <TableDisplay />
            </>
          }
        />

        <Route 
          path="/Home"
          element={
            <>
              <PageTitle title="Springboard To Wealth" />
              <Home />
            </>
          }
        />

        <Route 
          path="/RegisterOffice"
          element={
            <>
              <PageTitle title="Springboard To Wealth" />
              <RegisterOffice />
            </>
          }
        />

        <Route
          path="/Profile/page"
          element={
            <>
              <PageTitle title="Springboard To Wealth" />
              <UsuarioTable />
            </>
          }
        />

        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Springboard To Wealth" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/Cadastro"
          element={
            <>
              <PageTitle title="Springboard To Wealth" />
              <SignUp />
            </>
          }
        />

        <Route
          path="/Login"
          element={
            <>
              <PageTitle title="Springboard To Wealth" />
              <SignIn />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
