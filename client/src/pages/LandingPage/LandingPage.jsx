// importing react packages
import { useNavigate } from "react-router-dom";

// import helsinki logo
import HelsinkiLogo from "../../assets/HELSINKI_Tunnus_MUSTA_90x41.webp";

// importing components
import Button from "../../components/Button/Button";

const LandingPage = () => {
  // button styling/CSS
  const buttonStyle = {
    color: "var(--saukko-main-white)",
    background: "var(--saukko-main-black)",
  };

  // change page
  const navigate = useNavigate();

  return (
    <main className="landingPage__wrapper">
      <section className="landingPage__logoContainer">
        <img src={HelsinkiLogo} alt="" />
      </section>
      <section className="landingPage__textContainer">
        <h1>Saukko</h1>
        <p>
          Autamme sinua löytämään seuraavan askeleesi mahdollisimman nopeasti.
        </p>
      </section>
      <section className="landingPage__buttons">
        <Button
          text="Kirjaudu Sisään"
          style={buttonStyle}
          onClick={() => {
            navigate("/login");
          }}
        />
        <Button
          text="Luo Tili"
          onClick={() => {
            navigate("/register");
          }}
        />
      </section>
    </main>
  );
};

export default LandingPage;
