import styles from "./MatchesLayout.module.css";

const MatchesLayout = ({ children, onChangeJornada, currentJornada }) => {
  return (
    <main className={styles.container__matches}>
      <header>
        <h1 className={styles.title__layout}>Partidos</h1>
        <div className={styles.filters__container}>
          <span class="material-symbols-outlined">chevron_left</span>
          <ul className={styles.list__filters}>
            <li
              className={`${
                currentJornada === 1
                  ? styles.item__filters__active
                  : styles.item__filters
              }`}
              onClick={() => onChangeJornada(1)}
            >
              FECHA 1
            </li>
            <li
              className={`${
                currentJornada === 2
                  ? styles.item__filters__active
                  : styles.item__filters
              }`}
              onClick={() => onChangeJornada(2)}
            >
              FECHA 2
            </li>
            <li
              className={`${
                currentJornada === 3
                  ? styles.item__filters__active
                  : styles.item__filters
              }`}
              onClick={() => onChangeJornada(3)}
            >
              FECHA 3
            </li>
            <li
              className={`${
                currentJornada === "LAST_16"
                  ? styles.item__filters__active
                  : styles.item__filters
              }`}
              onClick={() => onChangeJornada("LAST_16")}
            >
              8vos
            </li>
            <li
              className={`${
                currentJornada === "QUARTER_FINALS"
                  ? styles.item__filters__active
                  : styles.item__filters
              }`}
              onClick={() => onChangeJornada("QUARTER_FINALS")}
            >
              4tos
            </li>
            <li
              className={`${
                currentJornada === "SEMI_FINALS"
                  ? styles.item__filters__active
                  : styles.item__filters
              }`}
              onClick={() => onChangeJornada("SEMI_FINALS")}
            >
              Semifinal
            </li>
            <li className={styles.item__filters}>Final</li>
          </ul>
          <span class="material-symbols-outlined">chevron_right</span>
        </div>
      </header>
      <div className={styles.container__table}>
        <table className={styles.table__matches}>
          <thead>
            <tr>
              <th className={styles.encabezado__table}></th>
              <th className={styles.encabezado__table}>Equipo</th>
              <th className={styles.encabezado__table}>Tu pronóstico</th>
              <th className={styles.encabezado__table}>Resultado</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>{children}</tbody>
        </table>
      </div>
    </main>
  );
};

export { MatchesLayout };
