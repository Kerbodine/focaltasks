import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { ViewProvider } from "./components/ViewContext";
import PrivateRoute from "./auth/PrivateRoute";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Home from "./components/Home";
import ForgotPassword from "./auth/ForgotPassword";

function App() {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Router>
        <AuthProvider>
          <ViewProvider>
            <Routes>
              <Route exact path="/" element={<PrivateRoute />}>
                <Route exact path="/" element={<Home />} />
              </Route>
              <Route path="/signup" exact element={<Signup />} />
              <Route path="/login" exact element={<Login />} />
              <Route
                path="/reset-password"
                exact
                element={<ForgotPassword />}
              />
            </Routes>
          </ViewProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
