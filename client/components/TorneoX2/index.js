import styles from "./TorneoX2.module.css";
import useAppContext from "../../Context";
import moment from "moment";
import useApiPost from "../../hooks/useApiPost";
import { useEffect, useState } from "react";
moment().format();

moment.updateLocale("es", {
  months: [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ],
});

const TorneoX2 = ({
  tournament,
  onShowModal,
  isSendRequest,
  isParticipating,
  isJoinTournament,
  onJoinTournament,
  onJoinRequest,
  onCancelJoinRequest,
  isLimit,
}) => {
  console.log("🚀 ~ file: index.js ~ line 36 ~ tournament", tournament);
  const { user } = useAppContext();
  const { token } = user;

  const participantsOrdered = tournament.participants?.sort((a, b) => {
    if (a.points > b.points) {
      return -1;
    }

    if (a.points < b.points) {
      return 1;
    } else {
      if (a.joinDate > b.joinDate) {
        return 1;
      }

      if (a.joinDate < b.joinDate) {
        return -1;
      }

      return 0;
    }
  });
  console.log(
    "🚀 ~ file: index.js ~ line 58 ~ participantsOrdered ~ participantsOrdered",
    participantsOrdered
  );

  console.log({ participantsOrdered });

  return (
    <div className={styles.container__torneox2}>
      <div className={styles.encabezado__torneox2}>
        <h1 className={styles.title__torneox2}>{tournament?.title}</h1>
        <div>
          <span>{tournament.type}</span>
          {tournament.type === "Privado" && isLimit && (
            <button
              onClick={() => onJoinRequest()}
              className={styles.button__disabled}
              disabled
            >
              Solicitar unirse
            </button>
          )}
          {tournament.type === "Abierto" && isLimit && (
            <button
              onClick={() => onJoinTournament()}
              className={styles.button__disabled}
              disabled
            >
              Unirse
            </button>
          )}
          {isJoinTournament && !isParticipating && !isLimit && (
            <button
              onClick={() => onShowModal(true)}
              className={styles.button__participating}
            >
              Participando
            </button>
          )}
          {isParticipating && !isLimit && (
            <button
              onClick={() => onShowModal(true)}
              className={styles.button__participating}
            >
              Participando
            </button>
          )}
          {isSendRequest && !isParticipating && !isLimit && (
            <button
              onClick={() => onCancelJoinRequest()}
              className={styles.button__participating}
            >
              Solicitud enviada
            </button>
          )}
          {tournament.type === "Abierto" &&
            !isJoinTournament &&
            !isParticipating &&
            !isLimit && (
              <button
                onClick={() => onJoinTournament()}
                className={styles.button__join}
              >
                Unirse
              </button>
            )}{" "}
          {tournament.type === "Privado" &&
            !isSendRequest &&
            !isParticipating &&
            !isLimit && (
              <button
                onClick={() => onJoinRequest()}
                className={styles.button__join}
              >
                Solicitar unirse
              </button>
            )}
        </div>
        <hr className={styles.border__torneox2} />
      </div>
      <div className={styles.info__torneox2}>
        <div className={styles.item__info__torneox2}>
          <span className={styles.title__item__torneox2}>
            Código del torneo
          </span>
          <div
            onClick={() => {
              navigator.clipboard.writeText(tournament.code);
            }}
            className={styles.code__tournament}
          >
            <span className={styles.data__item__torneox2}>
              {tournament.code}
            </span>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
            />
            <span class="material-symbols-outlined">content_copy</span>
          </div>
        </div>
        <div className={styles.item__info__torneox2}>
          <span className={styles.title__item__torneox2}>Participantes</span>
          <span className={styles.data__item__torneox2}>
            {tournament.participants?.length}/50
          </span>
        </div>
        <div className={styles.item__info__torneox2}>
          <span className={styles.title__item__torneox2}>
            Fecha de creación
          </span>
          <span className={styles.data__item__torneox2}>
            {moment(tournament.creationDate).format("DD MMMM, YYYY")}
          </span>
        </div>
        <div className={styles.item__info__torneox2}>
          <span className={styles.title__item__torneox2}>Creado por</span>
          <span className={styles.data__item__torneox2}>
            {tournament.creator?.username}
          </span>
        </div>
        <div className={styles.item__info__torneox2}>
          <span className={styles.title__item__torneox2}>Puntos</span>
          <span className={styles.data__item__torneox2}>
            {tournament.points}
          </span>
        </div>
      </div>
      <hr className={styles.border__torneox2} />
      <div className={styles.container__table}>
        <table className={styles.table__participants}>
          <tbody>
            {participantsOrdered?.map((participant, index) => {
              return (
                <tr>
                  <td className={styles.position}>
                    {participant.positionChange === "normal" && (
                      <>
                        <div>
                          <span className={styles.position__number}>
                            {index + 1}
                          </span>
                        </div>
                      </>
                    )}
                    {participant.positionChange === "ascendió" && (
                      <>
                        <link
                          rel="stylesheet"
                          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
                        />
                        <span
                          style={{ color: "green" }}
                          className={styles.differencePosition__asc}
                        >
                          +{participant.differencePosition}
                        </span>
                        <div>
                          <span
                            style={{ color: "green" }}
                            class="material-symbols-outlined"
                          >
                            arrow_drop_up
                          </span>
                          <span className={styles.position__number}>
                            {index + 1}
                          </span>
                        </div>
                      </>
                    )}
                    {participant.positionChange === "descendió" && (
                      <>
                        <link
                          rel="stylesheet"
                          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
                        />
                        <span
                          style={{ color: "red" }}
                          className={styles.differencePosition__desc}
                        >
                          {participant.differencePosition}
                        </span>
                        <div>
                          <span className={styles.position__number}>
                            {index + 1}
                          </span>
                          <span
                            style={{ color: "red" }}
                            class="material-symbols-outlined"
                          >
                            arrow_drop_down
                          </span>
                        </div>
                      </>
                    )}
                  </td>
                  <td className={styles.participant}>{participant.username}</td>
                  <td className={styles.points}>
                    <div>
                      <span>{participant.points}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { TorneoX2 };
