import { useState } from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from '@mui/icons-material/Menu';
import reactLogo from "./assets/react.svg";
import { Drawer, Button } from "@mui/material";
import "./App.css";
import Home from "./pages/Home";
import Account from "./pages/Account";
import MyReviews from "./pages/MyReviews";
import ReviewPage from "./pages/ReviewPage";
import { NewReview } from "./pages/NewReview";



function requireAuth() {
  let userCredential = localStorage.getItem("userCredential");
  if (userCredential == null) {
    console.log("Unauthorized access!");
    return false;
  }
  return true;
}

function ProtectedRoute({
  user,
  redirectURL,
  children,
}: {
  user: string | null;
  redirectURL: string;
  children: any;
}) {
  if (!user) {
    return <Navigate to={redirectURL} replace />;
  }

  return children;
}

function App() {
  const [sideMenu, toggleSideMenu] = useState(false);

  return (
    <div className="App">
      <div className="menu">
        <h1 className="menu--title">Ensemble</h1>
        <ul className="menu--buttons">
          <Link to={"/"}>
            <li>HOME</li>
          </Link>
          {localStorage.getItem("userCredential") ? (
            <Link to={"my-reviews"}>
              <li>MY REVIEWS</li>
            </Link>
          ) : null}
        </ul>
        <div className="account-icon">
          <Link to={"account"}>
            <span>
              {localStorage.getItem("userCredential") ? "Account" : "Sign In"}
            </span>
            <PersonIcon />
          </Link>
        </div>
        <div className="side-menu-btn">
          <Button variant="contained"
            sx={
              {
                backgroundColor: "purple"
              }
            }
            onClick={() => {
              toggleSideMenu(true);
            }}
          >
            <MenuIcon fontSize="large"/>
          </Button>
        </div>
        <Drawer
          anchor="right"
          open={sideMenu}
          onClose={() => {
            toggleSideMenu(false);
          }}
        >
          <ul className="side-menu--buttons">
            <Link to={"/"}>
              <li>HOME</li>
            </Link>
            {localStorage.getItem("userCredential") ? (
              <Link to={"my-reviews"}>
                <li>MY REVIEWS</li>
              </Link>
            ) : null}
            <Link to={"account"}>
                <li>ACCOUNT</li>
            </Link>
          </ul>
        </Drawer>
      </div>
      <div className="main-element">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-reviews" element={<MyReviews />} />
          <Route path="/account" element={<Account />} />
          <Route
            path="/review/:id"
            element={
              <ProtectedRoute
                user={localStorage.getItem("userCredential")}
                redirectURL={"/landing"}
              >
                <ReviewPage />
              </ProtectedRoute>
            }
          />
          <Route path="/new-review" element={<NewReview />} />
          <Route path="/landing" element={<div>Unauthorized access!</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
