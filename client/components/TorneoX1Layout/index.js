import Link from "next/link";
import styles from "./TorneoX1Layout.module.css";

const TorneoX1Layout = ({ children, length, page, onHandleInput }) => {
  return (
    <div className={styles.container__1}>
      <div className={styles.contenedor}>
        <div className={styles.encabezado__torneos}>
          {page ? <h1>Explorar</h1> : <h1>Mis torneos</h1>}
          {page ? null : length === 1 ? (
            <p>Estás participando en {length} torneo.</p>
          ) : (
            <p>Participá en torneos en "Explorar".</p>
          )}
        </div>
        <div className={styles.button__crear}>
          {page ? (
            <label className={styles.label__input} htmlFor="torneo">
              Filtrar por nombre o código
              <input
                onChange={onHandleInput}
                className={styles.input}
                type="text"
                placeholder="Nombre o código del torneo..."
                autoFocus
                id="torneo"
              />
            </label>
          ) : (
            <Link href="/torneos/explorar">
              <a className={styles.button__crear}>
                Explorar
                <link
                  rel="stylesheet"
                  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,200"
                />
                <span class="material-symbols-outlined">search</span>
              </a>
            </Link>
          )}

          <button id="crearTorneo">Crear torneo</button>
        </div>
      </div>
      <div className={styles.container__torneos}>{children}</div>
    </div>
  );
};

export { TorneoX1Layout };
