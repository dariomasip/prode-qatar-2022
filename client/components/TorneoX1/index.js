import styles from "./TorneoX1.module.css";

const TorneoX1 = ({ tournament }) => {
  return (
    <div className={styles.container__torneox1}>
      <div className={styles.info__torneo}>
        <h1>{tournament.title}</h1>
        {tournament.participants.length === 1 ? (
          <span>{tournament.participants.length} participante</span>
        ) : (
          <span>{tournament.participants.length} participantes</span>
        )}
      </div>
      <div className={styles.puntos_torneo}>
        <div className={styles.puntaje}>
          <span>{tournament.points}</span>
        </div>
        <span className={styles.puntos_text}>Puntos</span>
      </div>
    </div>
  );
};

export { TorneoX1 };
