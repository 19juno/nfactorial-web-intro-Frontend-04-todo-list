import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import { MyProvider } from "./ContextApp";

function App() {
  return (
    <>
      <div className="App">
        <Header />

        <MyProvider>
          <Main />
        </MyProvider>

        <Footer />
      </div>
    </>
  );
}

export default App;
