import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1 className="welcome">
          Welcome to <span className="nowrap">Dan D. repairs</span>
        </h1>
      </header>
      <main className="public__main">
        <p>Located in a beautiful downtown city</p>
        <p className="public__main-p">
          To see more information about us please register and have a beautiful
          journey
        </p>
        <p className="public__main-p">Phone: 001122334455</p>
        <p className="public__main-p">E-mail: shop@gmail.com</p>
      </main>
      <footer>
        <Link className="login" to="/login">
          login
        </Link>
        <Link className="register" to="/register">
          register
        </Link>
      </footer>
    </section>
  );
  return content;
};

export default Public;
