import HomePage from "pages/HomePage";
import LoginPage from "pages/LoginPage";
import ProfilePage from "pages/ProfilePage";
import SignupPage from "pages/SignupPage";
import UserAccountPage from "pages/UserAccountPage";
import WelcomePage from "pages/WelcomePage.jsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage></WelcomePage>}></Route>
        <Route path="/home" element={<HomePage></HomePage>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/signup" element={<SignupPage></SignupPage>}></Route>
        <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>
        <Route path="/account" element={<UserAccountPage></UserAccountPage>}></Route>



      </Routes>
      {/* <WelcomePage></WelcomePage> */}
      {/* <LoginPage></LoginPage> */}
      {/* <LoginForm width="35%"></LoginForm> */}
    </>
  );
}

export default App;
