import styles from "./GrupoX2.module.css";

const GrupoX2 = ({ group, scores }) => {
    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title__group}>{group}</h1>
            </header>
            <table className={styles.table}>
                <thead className={styles.header__table}>
                    <tr>
                        <th>#</th>
                        <th>Equipo</th>
                        <th className={styles.th__numbers}>PJ</th>
                        <th className={styles.th__numbers}>G</th>
                        <th className={styles.th__numbers}>E</th>
                        <th className={styles.th__numbers}>P</th>
                        <th className={styles.th__numbers}>GF</th>
                        <th className={styles.th__numbers}>GC</th>
                        <th className={styles.th__numbers}>DG</th>
                        <th className={styles.th__numbers}>Pts</th>
                        <th className={styles.th__numbers}>Últimos 5</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((score, index) => (
                        <tr key={index}>
                            <td className={styles.number__top}>
                                {score[1].position}
                            </td>
                            <td className={styles.tds}>
                                <div className="flag-team">
                                    <img
                                        className={styles.flag}
                                        src={score[1].team.crestUrl}
                                    />

                                    {score[1].team.name}
                                </div>
                            </td>
                            <td
                                className={`${styles.tds} ${styles.tds_numbers}`}
                            >
                                {score[1].playedGames}
                            </td>
                            <td
                                className={`${styles.tds} ${styles.tds_numbers}`}
                            >
                                {score[1].won}
                            </td>
                            <td
                                className={`${styles.tds} ${styles.tds_numbers}`}
                            >
                                {score[1].draw}
                            </td>
                            <td
                                className={`${styles.tds} ${styles.tds_numbers}`}
                            >
                                {score[1].lost}
                            </td>
                            <td
                                className={`${styles.tds} ${styles.tds_numbers}`}
                            >
                                {score[1].lost}
                            </td>
                            <td
                                className={`${styles.tds} ${styles.tds_numbers}`}
                            >
                                {score[1].goalsFor}
                            </td>
                            <td
                                className={`${styles.tds} ${styles.tds_numbers}`}
                            >
                                {score[1].goalDifference}
                            </td>
                            <td
                                className={`${styles.tds} ${styles.tds_numbers}`}
                            >
                                {score[1].points}
                            </td>
                            <td>
                                <div className={styles.indicadores}>
                                    <div className={styles.indicador}></div>
                                    <div className={styles.indicador}></div>
                                    <div className={styles.indicador}></div>
                                    <div className={styles.indicador}></div>
                                    <div className={styles.indicador}></div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <style jsx>{`
                tr {
                    border-bottom: 2px solid #d5cfb2;
                }

                .flag-team {
                    display: flex;
                    align-items: center;
                }

                th,
                td {
                    padding: 15px 10px;
                }

                td {
                    height: 50px;
                    vertical-align: center;
                }
            `}</style>
        </main>
    );
};

export { GrupoX2 };
