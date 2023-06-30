import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";

function Landing({isLoggedIn, onBurgerClick}) {
  const location = useLocation();

  return(
    <>
      <Header isLoggedIn={isLoggedIn} onBurgerClick={onBurgerClick}/>
      <Main />
      {location.pathname !== "/profile" && <Footer />}
    </>
  )
}

export default Landing;