import axios from 'axios';
import { useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import { userContext } from './context/Context';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Home from './pages/Home';
import CourseDetail from './pages/CourseDetail';
import CreateCourse from './pages/CreateCourse';
import UpdateCourse from './pages/UpdateCourse';
import UserSignIn from './pages/UserSignIn';
import UserSignUp from './pages/UserSignUp';
import Forbidden from './pages/Forbidden';
import NoRoute from './pages/NoRoute';
import UnhandledError from './pages/UnhandledError';

// Components
import Header from './components/Header';

function App() {
  axios.defaults.baseURL = 'http://localhost:5000/api/';
  const value = useContext(userContext);
  const setUser = value.setUser;

  useEffect(() => {
    if (Cookies.get('authenticatedUser')) {
      let data = Cookies.get('authenticatedUser');
      data = JSON.parse(data);
      setUser(data);
    }
  }, [setUser]);

  return (
    <div className="root">
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PrivateRoute />}>
            <Route path="/courses/create" element={<CreateCourse />} />
            <Route path="/courses/:id/update" element={<UpdateCourse />} />
          </Route>
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/signin" element={<UserSignIn />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="/error" element={<UnhandledError />} />
          <Route path="*" element={<NoRoute />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
