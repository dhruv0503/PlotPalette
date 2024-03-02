import { Flex, Button } from '@radix-ui/themes';
import Homepage from './pages/Homepage';
import firebase from 'firebase/compat/app';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AccountPage from './pages/Accountpage';
import SignIn from './pages/SignIn';
import Template from './pages/Template';
import Movies from './pages/Movies';
import Books from './pages/Books';
import Aboutsus from './pages/Aboutsus';
import Upcoming from './components/Upcoming';
import TopRated from './components/TopRated';
import Popular from './components/Popular';
import { MyContextProvider } from "./Context/Contxt";
import NowPlaying from './components/NowPlaying';
import FavList from './pages/FavList';
import NoPage from './pages/NoPage';
import Category from './components/Category';
import SearchResults from './pages/SearchResults';
import Actors from './pages/Actors';

function App() {
  return (
    <MyContextProvider>
      <Router>
        <Routes>
          <Route element={<FavList/>} path='/account/favlist' />
          <Route element={<Homepage />} path='/' />
          <Route element={<AccountPage />} path='/account' />
          <Route element={<SignIn />} path='/signin' />
          <Route element={<Template />} path='movies/:movieId' />
          <Route element={<Books />} path='/books' />
          <Route element={<Upcoming/>} path='/movies/upcoming' />
          <Route element={<TopRated />} path='/movies/toprated' />
          <Route element={<NowPlaying />} path='/movies/nowplaying' />
          <Route element={<Popular/>} path='/movies/popular' />
          <Route element={<NoPage />} path='*' />
          <Route element={<Aboutsus />} path='/about' />
          <Route element={<Category />} path='/movies/Category' />
          <Route element={<SearchResults />} path='/search/:searchID' />
          <Route element={<Actors />} path='/Actor/:ActorId' />
        </Routes>
      </Router>
    </MyContextProvider>
  );
}

export default App;
