import CartPage from "./pages/CartPage";
import Homepage from "./pages/Homepage";
import Items from "./pages/Items";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Homepage />}></Route>
          <Route path="/items" element={<Items />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
