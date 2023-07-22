import styles from "./Matches.module.css";
import moment from "moment";
import { format, render, cancel, register } from "timeago.js";
import locale from "../../helpers/timeAgo";
import { useEffect, useState } from "react";
import useApiPost from "../../hooks/useApiPost";
import { useAppContext } from "../../Context";
moment().format();

const Matches = ({ match, prediction }) => {
  const [timeCurrent, setTimeCurrent] = useState(null);
  const [isViewTimeLeft, setViewTimeLeft] = useState(false);
  const [isEditPredict, setEditPredict] = useState(false);
  const [resultUser, setResultUser] = useState([]);
  const [predictionChanged, setPredictionChanged] = useState([]);
  const [isDescartar, setDescartar] = useState([]);

  console.log(
    "🚀 ~ file: index.js ~ line 19 ~ Matches ~ predictionChanged",
    predictionChanged
  );
  console.log(
    "🚀 ~ file: index.js ~ line 16 ~ Matches ~ resultUser",
    resultUser
  );
  const { user } = useAppContext();
  const { token } = user;

  useEffect(() => {
    setPredictionChanged([prediction.home, prediction.away]);
  }, [prediction]);

  const savePredicts = () => {
    if (!resultUser[1]) {
      useApiPost(
        "https://the-prophecy-game.rj.r.appspot.com/api/pronosticos",
        {
          idMatch: match.id,
          homeTeam: resultUser[0],
          awayTeam: prediction?.away,
        },
        token
      );

      setEditPredict(false);
    } else if (!resultUser[0]) {
      useApiPost(
        "https://the-prophecy-game.rj.r.appspot.com/api/pronosticos",
        {
          idMatch: match.id,
          homeTeam: prediction?.away,
          awayTeam: resultUser[1],
        },
        token
      );

      setEditPredict(false);
    } else {
      useApiPost(
        "https://the-prophecy-game.rj.r.appspot.com/api/pronosticos",
        {
          idMatch: match.id,
          homeTeam: resultUser[0],
          awayTeam: resultUser[1],
        },
        token
      );

      setEditPredict(false);
    }
  };

  const enableButtons = (event, result) => {
    setEditPredict(true);
    if (!prediction?.away && event.target.name === "home") {
      setPredictionChanged([result, predictionChanged[1]]);
      setResultUser([result, predictionChanged[1]]);
    } else if (!prediction?.home && event.target.name === "away") {
      setPredictionChanged([predictionChanged[0], result]);
      setResultUser([predictionChanged[0], result]);
    } else if (prediction?.away && event.target.name === "home") {
      setPredictionChanged([result, predictionChanged[1]]);
      setResultUser([result, predictionChanged[1]]);
    } else if (prediction?.home && event.target.name === "away") {
      setPredictionChanged([predictionChanged[0], result]);
      setResultUser([predictionChanged[0], result]);
    }
  };

  return (
    <tr>
      <td className={styles.column__date_status}>
        {match?.status === "IN_PLAY" && (
          <div className={styles.status__time__column}>
            <div className={styles.status__match__inPlay}>
              <span className={styles.text__start}>En vivo</span>
            </div>
          </div>
        )}

        {match?.status === "PAUSED" && (
          <div className={styles.status__time__column}>
            <div className={styles.status__match__inPause}>
              <span className={styles.text__start}>Entretiempo</span>
            </div>
          </div>
        )}

        {match?.status === "FINISHED" && (
          <div className={styles.status__time__column}>
            <div className={styles.status__match__finished}>
              <span className={styles.text__start}>Finalizado</span>
            </div>
            <div className={styles.time__match}>
              {format(moment.utc(match.utcDate).local().format(), "es_ES")}
            </div>
          </div>
        )}
        {match?.status === "SCHEDULED" && !isViewTimeLeft && (
          <div className={styles.status__time__column}>
            <div className={styles.status__match}>
              <span className={styles.text__start}>Programado</span>
            </div>
            <div
              onClick={() => setViewTimeLeft(!isViewTimeLeft)}
              className={styles.time__match}
            >
              {moment.parseZone(match.utcDate).local().format("DD/MM")}
              <br />
              {moment.parseZone(match.utcDate).local().format("HH:mm")}
            </div>
          </div>
        )}

        {match?.status === "SCHEDULED" && isViewTimeLeft && (
          <div className={styles.status__time__column}>
            <div className={styles.status__match}>
              <span className={styles.text__start}>Programado</span>
            </div>
            <div
              onClick={() => setViewTimeLeft(!isViewTimeLeft)}
              className={styles.time__match}
            >
              {format(moment.utc(match.utcDate).local().format(), "es_ES")}
            </div>
          </div>
        )}
      </td>
      <td className={styles.teams__match}>
        <div className={styles.team__home}>
          {/* <img className={styles.flag} src={flags.home?.crestUrl} /> */}
          {match?.homeTeam.name}
        </div>
        <div className={styles.team__away}>
          {/* <img className={styles.flag} src={flags.away?.crestUrl} /> */}
          {match?.awayTeam.name}
        </div>
      </td>
      <td className={styles.column__your__pronostico}>
        {match?.status === "SCHEDULED" && (
          <div className={styles.your__pronostico}>
            <input
              id="predictionHome"
              onChange={(event) => enableButtons(event, event.target.value)}
              className={styles.input__pronostico}
              defaultValue={predictionChanged[0]}
              name="home"
            />
            <input
              id="predictionAway"
              onChange={(event) => enableButtons(event, event.target.value)}
              className={styles.input__pronostico}
              defaultValue={predictionChanged[1]}
              name="away"
            />
            {isEditPredict && (
              <div className={styles.footer__table}>
                <button
                  className={styles.button__afirmative}
                  onClick={() => savePredicts()}
                  type="button"
                >
                  Guardar
                </button>
                <button
                  className={styles.button__decline}
                  type="button"
                  onClick={() => setEditPredict(false)}
                >
                  Descartar
                </button>
              </div>
            )}
          </div>
        )}
        {(match?.status === "IN_PLAY" || match?.status === "PAUSED") && (
          <div className={styles.your__pronostico}>
            <input
              defaultValue={predictionChanged[0]}
              className={styles.input__pronostico}
              disabled
            />
            <input
              defaultValue={predictionChanged[1]}
              className={styles.input__pronostico}
              disabled
            />
          </div>
        )}
        {match?.status === "FINISHED" && (
          <div className={styles.your__pronostico}>
            <input
              defaultValue={predictionChanged[0]}
              className={styles.input__pronostico}
              disabled
            />
            <input
              defaultValue={predictionChanged[1]}
              className={styles.input__pronostico}
              disabled
            />
          </div>
        )}
      </td>
      <td className={styles.results__column}>
        <div className={styles.results}>
          <div className={styles.results__matches}>
            <div className={styles.result}>
              {match?.score?.fullTime?.homeTeam}
            </div>
            <div className={styles.result}>
              {match?.score?.fullTime?.awayTeam}
            </div>
          </div>
          <div className={styles.results__users}>
            <div className={styles.result_user}>
              {prediction?.result || prediction?.result === 0 ? (
                <span className={styles.number__result__user}>
                  {prediction?.result}
                </span>
              ) : (
                <span className={styles.number__result__user}>-</span>
              )}
            </div>
            <span>Puntos</span>
          </div>
        </div>
      </td>
    </tr>
  );
};

export { Matches };
