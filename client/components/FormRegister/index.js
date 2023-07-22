import { useEffect, useState } from "react";
import styles from "./FormRegister.module.css";
import useApiPost from "../../hooks/useApiPost";
import useApi from "../../hooks/useApi";
import { useRouter } from "next/router";
import Link from "next/link";
const FormRegister = () => {
  const router = useRouter();
  const [usernames] = useApi(
    "https://the-prophecy-game.rj.r.appspot.com/api/usuario/usernames"
  );
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [errorsUsername, setErrorUsername] = useState([]);
  const [errorsEmail, setErrorEmail] = useState([]);
  const [errorsPassword, setErrorsPassword] = useState([]);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormOk, setFormOk] = useState(false);
  const [isSendForm, setSendForm] = useState(false);

  useEffect(() => {
    if (password.length < 8 && password.length > 0) {
      let errorsPasswords = [];
      errorsPasswords.push("Debe tener al menos 8 carácteres.");
      setErrorsPassword(errorsPasswords);
      setFormOk(false);
    } else {
      setErrorsPassword([]);
      setFormOk(true);
    }
  }, [password]);

  useEffect(() => {
    if (usernames.some((element) => element.credentials.email === email)) {
      let errorsEmails = [];
      errorsEmails.push("Ya existe una cuenta con este email.");
      setErrorEmail(errorsEmails);
      setFormOk(false);
    } else {
      setErrorEmail([]);
      setFormOk(true);
    }
  }, [email]);

  useEffect(() => {
    if (username.match(/[`!@#$%^&*()+\-=\[\]{};':"\\|,<>\/?~]/)) {
      let errorsUsernames = [];
      errorsUsernames.push("No debe tener carácteres especiales.");
      setErrorUsername(errorsUsernames);
      setFormOk(false);
    } else if (!username.match(/[a-zA-Z]/) && username.length > 1) {
      let errorsUsernames = [];
      errorsUsernames.push("Debe tener al menos una letra.");
      setErrorUsername(errorsUsernames);
      setFormOk(false);
    } else if (
      usernames.some((element) => element.credentials.username === username)
    ) {
      let errorsUsernames = [];
      errorsUsernames.push("Ya existe este nombre usuario.");
      setErrorUsername(errorsUsernames);
      setFormOk(false);
    } else {
      setErrorUsername([]);
      setFormOk(true);
    }
  }, [username]);

  const handleUsername = (usernameUser) => {
    setUsername(usernameUser.replace(/ /g, "_").toLowerCase());
  };

  const handleRegister = (event) => {
    event.preventDefault();
    console.log("handle");
    useApiPost("https://the-prophecy-game.rj.r.appspot.com/api/auth/registro", {
      username: username,
      email: email.toLowerCase().trim(),
      password: password,
    })
      .then((e) => setSendForm(true))
      .catch((e) => console.error(e));
  };

  return (
    <>
      <div className={styles.contenedor}>
        {!isSendForm && (
          <div className={styles.contenedor__login}>
            <header>
              <h1 className={styles.titulo__login}>Registro</h1>
            </header>
            <small>{errorMessage}</small>
            <form onSubmit={(event) => handleRegister(event)}>
              <label className={styles.input__form}>
                Nombre de usuario
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={({ target }) => handleUsername(target.value)}
                />
                {errorsUsername.length > 0 &&
                  errorsUsername.map((error) => (
                    <small style={{ color: "red" }}>{error}</small>
                  ))}
              </label>
              <label className={styles.input__form}>
                Correo electrónico
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                />
                {errorsEmail.length > 0 &&
                  errorsEmail.map((error) => (
                    <small style={{ color: "red" }}>{error}</small>
                  ))}
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
                {errorsPassword.length > 0 &&
                  errorsPassword.map((error) => (
                    <small style={{ color: "red" }}>{error}</small>
                  ))}
              </label>
              {!isFormOk && (
                <button
                  disabled
                  className={styles.submit__form__disable}
                  type="submit"
                >
                  Registrarse
                </button>
              )}
              {isFormOk && (
                <button className={styles.submit__form} type="submit">
                  Registrarse
                </button>
              )}
            </form>
            <div className={styles.warnings__form}>
              <p>
                ¿Ya tienes una cuenta?
                <a href="/login"> Inicia sesión</a>
              </p>
            </div>
          </div>
        )}
        {isSendForm && (
          <div className={styles.contenedor__login__tranks}>
            <span className={styles.warnings__form}>
              ¡Gracias por registrarte!
              <br /> Te enviamos un correo electrónico para verificar tu cuenta.
              <br />
              <small>¿No lo recibiste aún? Revisá la bandeja de spam.</small>
            </span>
          </div>
        )}
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

export { FormRegister };
