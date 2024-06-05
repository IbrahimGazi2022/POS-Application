import CartPage from "./pages/CartPage";
import Homepage from "./pages/Homepage";
import Items from "./pages/Items";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<ProtectedRoute><Homepage/></ProtectedRoute>}/>
          <Route path="/items" element={<ProtectedRoute><Items/></ProtectedRoute>}/>
          <Route path="/cart" element={<ProtectedRoute><CartPage/></ProtectedRoute>}/>
          <Route path="/register" element={<ProtectedRoute><Register/></ProtectedRoute>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

export function ProtectedRoute({ children }) {
  if (localStorage.getItem("pos-user")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
