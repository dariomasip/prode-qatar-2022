import { useEffect, useState } from "react";
import loginService from "../../services/loginService";
import styles from "./FormLogin.module.css";
import { useAppContext } from "../../Context";

const FormLogin = () => {
  const { setUser } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        email,
        password,
      });

      if (!user) throw new Error("Correo electrónico o contraseña inváilidos");

      user && window.localStorage.setItem("loggedUser", JSON.stringify(user));

      console.log(user);
      setUser(user);
      setEmail("");
      setPassword("");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <div className={styles.contenedor}>
        <div className={styles.contenedor__login}>
          <header>
            <h1 className={styles.titulo__login}>Acceder</h1>
          </header>
          <small>{errorMessage}</small>
          <form onSubmit={handleLogin}>
            <label className={styles.input__form}>
              Correo electrónico
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </label>
            <label className={styles.input__form}>
              Contraseña
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
            <button className={styles.submit__form} type="submit">
              Iniciar sesión
            </button>
          </form>
          <div className={styles.warnings__form}>
            <p>
              ¿No tienes una cuenta?
              <a href="/registro"> Regístrate</a>
            </p>
            <p>
              <a href="/login">¿Olvidaste tu contraseña?</a>
            </p>
          </div>
        </div>
      </div>
      <style jsx global>{`
        body {
          margin: 0;
          background: transparent
            linear-gradient(241deg, #941832 0%, #65111f 100%) 0% 0% no-repeat
            padding-box;
          overflow-y: hidden;
        }
      `}</style>
    </>
  );
};

export { FormLogin };
