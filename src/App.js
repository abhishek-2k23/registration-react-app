import Home from './components/Home';
import About from './components/About';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import NavBar from './components/NavBar';
import Dashboard  from './components/Dashboard';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import { Route, Routes } from 'react-router-dom';
// import { RegistrationContext } from './context/registrationContext';
// import { useContext } from 'react';

function App() {

  return (
    <div className="App bg-[#041E39] overflow-hidden max-h-screen">
      <div>
        <NavBar></NavBar>
      </div>
      <Routes>
        <Route path='/' element ={<Home></Home>}></Route>
        <Route path='/About' element ={<About></About>}></Route>
        <Route path='/Dashboard' element ={<Dashboard></Dashboard>}></Route>

        <Route path='/login' element={<LoginPage></LoginPage>}></Route>
        <Route path='/register' element={<RegistrationPage></RegistrationPage>}></Route>
        
        <Route path='/PasswordReset' element={<ForgotPasswordPage></ForgotPasswordPage>}></Route>
        <Route path='/updatePassword' element={<ChangePasswordPage></ChangePasswordPage>}></Route>
      </Routes>
    </div>
  );
}

export default App;
