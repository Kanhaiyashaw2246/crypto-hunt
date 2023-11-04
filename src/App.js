import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Hompage from "./pages/Hompage";
import Coinpage from "./pages/Coinpage";
import DatatablePage from "./components/DatatablePage";
import AlertComp from "./components/AlertComp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" Component={Hompage} />
          <Route exact path="/home" Component={Hompage} />
          <Route path="/coins/:id" Component={Coinpage}/>
          <Route path="/explore" Component={DatatablePage}/>
        </Routes>
        <AlertComp/>
      </BrowserRouter>
    </>
  );
}

export default App;
