import { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/Login';
import SiteHeadingAndNav from './components/SiteHeadingAndNav';
import NotFoundPage from './pages/NotFound';
import UserContext from './contexts/current-user-context';
import { checkForLoggedInUser } from './adapters/auth-adapter';
import CreatePostForm from './pages/CreatePostForm';
import EventsPage from './pages/EventsPage';
import EventsForm from './components/EventsForm';
import UserPage from './pages/User';
import AboutPage from './components/AboutPage';
import MorePost from './components/MorePost';
import Footer from './pages/Footer';

export default function App() {
  const { setCurrentUser } = useContext(UserContext);
  useEffect(() => {
    checkForLoggedInUser().then(setCurrentUser);
  }, [setCurrentUser]);

  return <>
    <SiteHeadingAndNav />
    <main>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/createPostPage' element={<CreatePostForm />} />
        <Route path='/users/:id' element={<UserPage />} />
        <Route path='/eventPage' element={<EventsPage />} />
        <Route path='/createEventForm' element={<EventsForm />} />
        <Route path='/aboutUs' element={<AboutPage />} />
        <Route path='/post/:id' element={<MorePost/>} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </main>
  </>;
}


