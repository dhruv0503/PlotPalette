import { Flex, Button } from '@radix-ui/themes';
import Homepage from './pages/Homepage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AccountPage from './pages/Accountpage';
import SignIn from './pages/SignIn';
import Template from './pages/Template';
import Movies from './pages/Movies';
import Books from './pages/Books';
import Aboutsus from './pages/Aboutsus';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Homepage />} path='/' />
          <Route element={<AccountPage />} path='/account' />
          <Route element={<SignIn />} path='/signin' />
          <Route element={<Template />} path='/temp' />
          <Route element={<Books />} path='/books' />
          <Route element={<Movies />} path='/movies' />
          <Route element={<Aboutsus />} path='/about' />
        </Routes>
      </Router>
    </>
  );
}

export default App;
