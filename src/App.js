import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";

function App() {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Router>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <div className="w-screen h-screen grid place-items-center">
                <p>Main App Page</p>
              </div>
            }
          />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/login" exact element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
