import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import SinglePages from "./components/pages/SinglePages/SinglePages.js";
import NotFound from "./components/pages/NotFound/NotFound";
import Header from "./components/views/Header/Header";
import Footer from "./components/views/Footer/Footer";


function App() {
  return (
    <main>
        <Container>
          <Header/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/table/:tableId" element={<SinglePages/>} />
                <Route path="*" element={<NotFound/>} /> 
            </Routes>
            <Footer/>
        </Container>
    </main>
  );
}
export default App;
