import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./LoginPage";
import Notetext from "./Notetext";
import SignupComponent from "./Signup";
import LogoutButton from "./LogoutButton";

const App = () => {
  return (
    <div>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/notetext">My Notes</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <LogoutButton /> {/* Add the LogoutButton component */}
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/notetext" element={<Notetext />} />
          <Route path="/signup" element={<SignupComponent />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
