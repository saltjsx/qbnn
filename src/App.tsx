import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Article from "./pages/Article";
import Search from "./pages/Search";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:category" element={<Category />} />
          <Route path="/article/:slug" element={<Article />} />
          <Route path="/search" element={<Search />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
