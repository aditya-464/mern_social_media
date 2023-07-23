import { Ad } from "pages/Ad";
import HomePage from "pages/HomePage";
import LoaderPage from "pages/LoaderPage";
import LoginPage from "pages/LoginPage";
import ProfilePage from "pages/ProfilePage";
import SignupPage from "pages/SignupPage";
import UserAccountPage from "pages/UserAccountPage";
import WelcomePage from "pages/WelcomePage.jsx";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

function App() {
  const mode = useSelector((state) => state.mode);
  const changeBodyColor = () => {
    document.documentElement.style.setProperty("--html-color", mode === "light" ? "#dfdddd" : "#181818");
  }
  useEffect(() => {
    changeBodyColor();
  }, [mode])
  
  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage></WelcomePage>}></Route>
        <Route path="/home" element={<HomePage></HomePage>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/signup" element={<SignupPage></SignupPage>}></Route>
        <Route path="/profile/:id" element={<ProfilePage></ProfilePage>}></Route>
        <Route path="/account" element={<UserAccountPage></UserAccountPage>}></Route>
        <Route path="/loader" element={<LoaderPage></LoaderPage>}></Route>
      </Routes>
    </>
  );
}

export default App;
