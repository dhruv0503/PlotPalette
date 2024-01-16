import { Flex, Button } from '@radix-ui/themes';
import Homepage from './pages/Homepage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AccountPage from './pages/Accountpage';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Homepage />} path='/' />
          <Route element={<AccountPage />} path='/account' />
        </Routes>
      </Router>
    </>
  );
}

export default App;
