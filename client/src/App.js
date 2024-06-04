import CartPage from "./pages/CartPage";
import Homepage from "./pages/Homepage";
import Items from "./pages/Items";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Homepage />}></Route>
          <Route path="/items" element={<Items />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
