import styles from "./GrupoX1.module.css";

const GrupoX1 = ({ url, nameGroup, scores }) => {
  return (
    <>
      <div className={styles.Contenedor}>
        <h2 className={styles.title__group}>{nameGroup}</h2>
        <hr className={styles.hr} />
        <div className={styles.team__rows}>
          {scores.map((team, key) => {
            return (
              <div key={key} className={styles.team__row}>
                <figure className={styles.container__flag}>
                  <img
                    className={styles.flag}
                    src={team[1].team.crestUrl}
                    alt={team[3]}
                  ></img>
                </figure>
                <div className={styles.team__name}>
                  <strong>{team[2]?.tla}</strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export { GrupoX1 };
