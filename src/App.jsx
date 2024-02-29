import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./components/Main";
import ModalWindow from "./components/Main/ModalWindow";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App">
        <Header />
        <Main />

        <Footer />
      </div>
    </>
  );
}

export default App;
