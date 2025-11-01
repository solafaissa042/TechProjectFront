import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState, useEffect } from "react";
import { useRegisterMutation } from "./authApiSlice";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import usePersist from "../../hooks/usePersist";
import { setCredentials } from "./authSlice";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchpwd, setMatchPwd] = useState("");
  const [validMatchpwd, setValidMatchPwd] = useState(false);
  const [matchpwdFocus, setMatchPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const [persist, setPersist] = usePersist();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    const match = pwd === matchpwd;
    setValidMatchPwd(match);
  }, [pwd, matchpwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchpwd]);

  const handleToggle = () => setPersist((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { accessToken } = await register({
        username: user,
        password: pwd,
      }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUser("");
      setPwd("");
      navigate("/dash");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration failed");
      }
      //errRef.current.focus();
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <section className="public">
        <header>
          <h1>Employee Register</h1>
        </header>
        <main className="register">
          <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"}>
            {errMsg}
          </p>
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !user ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              className="form__input"
              type="text"
              id="username"
              required
              autoComplete="off"
              ref={userRef}
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onChange={(e) => setUser(e.target.value)}
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters. <br />
              must begin with a letter. <br />
              letters, numbers, underscores, hyphens are allowed.
            </p>

            <label htmlFor="password">
              Password:
              <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              className="form__input"
              type="password"
              id="password"
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onChange={(e) => setPwd(e.target.value)}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              must include uppercase and lowercase letters, <br /> a number and
              special characters ! @ # $ %
            </p>

            <label htmlFor="confirm_password">
              Confirm Password:
              <span className={validMatchpwd && matchpwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMatchpwd || !matchpwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              className="form__input"
              type="password"
              id="confirm_password"
              required
              aria-invalid={validMatchpwd ? "false" : "true"}
              aria-describedby="confirmnote"
              onChange={(e) => setMatchPwd(e.target.value)}
              onFocus={() => setMatchPwdFocus(true)}
              onBlur={() => setMatchPwdFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchpwdFocus && !validMatchpwd ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              must match the first password input field.
            </p>

            <button
              disabled={
                !validPwd || !validName || !validMatchpwd ? true : false
              }
            >
              Sign Up
            </button>
            <label htmlFor="persist" className="form__persist">
              <input
                type="checkbox"
                className="form__checkbox"
                id="persist"
                onChange={handleToggle}
                checked={persist}
              />
              Trust This Device
            </label>
          </form>
        </main>
        <footer>
          <p>Already Registered?</p>
          <Link to="/login">Sign In</Link>
        </footer>
      </section>
    </>
  );
};

export default Register;
