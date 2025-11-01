import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Dan D. repairs</span>
        </h1>
      </header>
      <main className="public__main">
        <p>Located in a beautiful downtown city</p>
      </main>
      <footer>
        <Link to="/login"> login</Link>
        <Link to="/register"> register</Link>
      </footer>
    </section>
  );
  return content;
};

export default Public;
