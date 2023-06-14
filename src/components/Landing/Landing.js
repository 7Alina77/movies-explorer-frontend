import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";

function Landing() {
  const location = useLocation();

  return(
    <>
      <Header />
      <Main />
      {location.pathname !== "/profile" && <Footer />}
    </>
  )
}

export default Landing;