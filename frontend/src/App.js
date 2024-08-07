import Homepage from './pages/Homepage';
import OtherFriend from './pages/OtherFriend';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AccountPage from './pages/Accountpage';
import SignIn from './pages/SignIn';
import Template from './pages/Template';
import Movies from './pages/Movies';
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
import OthersPage from './pages/OthersPage';
import ResetPass from './pages/ResetPass';
import FriendPage from './pages/FriendPage';
import OtherFavList from './pages/OtherFavList';

function App() {
  return (
    <MyContextProvider>
      <Router>
        <Routes>
          <Route element={<FavList/>} path='/collections/:collectionid' />
          <Route element={<Homepage />} path='/' />
          <Route element={<AccountPage />} path='/account' />
          <Route element={<SignIn />} path='/signin' />
          <Route element={<Template />} path='movies/:movieId' />
          <Route element={<Upcoming/>} path='/movies/upcoming' />
          <Route element={<TopRated />} path='/movies/toprated' />
          <Route element={<NowPlaying />} path='/movies/nowplaying' />
          <Route element={<Popular/>} path='/movies/popular' />
          <Route element={<NoPage />} path='*' />
          <Route element={<Category />} path='/movies/Category/:categoryID' />
          <Route element={<Movies />} path='/movies' />
          <Route element={<SearchResults />} path='/search/:searchID' />
          <Route element={<Actors />} path='/Actor/:ActorId' />
          <Route element={<OthersPage />} path='/Account/:UserID' />
          <Route element={<ResetPass />} path='/signin/reset' />
          <Route element={<FriendPage />} path='/user/friends' />
          <Route element={<OtherFriend />} path='/Account/:UserID/friend' />
          <Route element={<OtherFavList/>} path='/Account/:userID/:collectionID' />
        </Routes>
      </Router>
    </MyContextProvider>
  );
}

export default App;
