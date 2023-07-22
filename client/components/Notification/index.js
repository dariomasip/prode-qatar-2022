import Link from "next/link";
import useApi from "../../hooks/useApi";
import useApiPost from "../../hooks/useApiPost";
import { useAppContext } from "../../Context";
import { format, render, cancel, register } from "timeago.js";
import styles from "./Notification.module.css";
import { useState } from "react";
import locale from "../../helpers/timeAgo";

const Notification = ({
  notification,
  onConfimUser,
  onDeclineUser,
  onDeleteNotification,
}) => {
  const { user } = useAppContext();
  const { token } = user;
  const contentJSON = JSON.parse(notification.content);

  return (
    <>
      {notification.type === "joinTournament" && (
        <li className={styles.container_notification}>
          <div>
            <span className={styles.text__destacado}>
              {contentJSON.joinUser?.username}
            </span>{" "}
            se ha unido al torneo{" "}
            <Link href={`/torneos/${contentJSON.tournament.code}`}>
              <a className={styles.text__destacado}>
                {contentJSON.tournament?.title}
              </a>
            </Link>
            <div>
              <span className={styles.time_ago}>
                {format(notification.date, "es_ES")}
              </span>
            </div>
          </div>
          <div
            onClick={() => onDeleteNotification(notification._id)}
            className={styles.button_close}
          >
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
            />
            <span class="material-symbols-outlined">close</span>
          </div>
        </li>
      )}
      {notification.type === "leaveTournament" && (
        <li className={styles.container_notification}>
          <div>
            <span className={styles.text__destacado}>
              {contentJSON.leaveUser?.username}
            </span>{" "}
            ha abandonado el torneo{" "}
            <Link href={`/torneos/${contentJSON.tournament.code}`}>
              <a className={styles.text__destacado}>
                {contentJSON.tournament?.title}
              </a>
            </Link>
            <div>
              <span className={styles.time_ago}>
                {format(notification.date, "es_ES")}
              </span>
            </div>
          </div>
          <div
            onClick={() => onDeleteNotification(notification._id)}
            className={styles.button_close}
          >
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
            />
            <span class="material-symbols-outlined">close</span>
          </div>
        </li>
      )}
      {notification.type === "acceptRequest" && (
        <li className={styles.container_notification}>
          <div>
            <span className={styles.text__destacado}>
              {contentJSON.declinedUser?.username}
            </span>{" "}
            ha aceptado tu solicitud
            <br />
            Ya estás participando en el torneo{" "}
            <Link href={`/torneos/${contentJSON.tournament.code}`}>
              <a className={styles.text__destacado}>
                {contentJSON.tournament?.title}
              </a>
            </Link>
            <div>
              <span className={styles.time_ago}>
                {format(notification.date, "es_ES")}
              </span>
            </div>
          </div>
          <div
            onClick={() => onDeleteNotification(notification._id)}
            className={styles.button_close}
          >
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
            />
            <span class="material-symbols-outlined">close</span>
          </div>
        </li>
      )}
      {notification.type === "joinRequest" && (
        <li className={styles.container_notification}>
          <div>
            <span className={styles.text__destacado}>
              {contentJSON.requestingUser?.username}
            </span>{" "}
            quiere unirse al torneo{" "}
            <Link href={`/torneos/${contentJSON.tournament.code}`}>
              <a className={styles.text__destacado}>
                {contentJSON.tournament.title}
              </a>
            </Link>
            <div>
              <button
                onClick={() =>
                  onConfimUser(
                    contentJSON.tournament.code,
                    contentJSON.requestingUser.id,
                    notification._id
                  )
                }
                className={styles.button__confirm}
              >
                Confirmar
              </button>
              <button
                onClick={() =>
                  onDeclineUser(
                    contentJSON.tournament.code,
                    contentJSON.requestingUser.id,
                    notification._id
                  )
                }
                className={styles.button__decline}
              >
                Rechazar
              </button>
              <span className={styles.time_ago}>
                {format(notification.date, "es_ES")}
              </span>
            </div>
          </div>
        </li>
      )}
      {notification.type === "declinedRequest" && (
        <li className={styles.container_notification}>
          <div>
            <span className={styles.text__destacado}>
              {contentJSON.declinedUser?.username}
            </span>{" "}
            ha rechazado unirte a{" "}
            <Link href={`/torneos/${contentJSON.tournament.code}`}>
              <a className={styles.text__destacado}>
                {contentJSON.tournament?.title}
              </a>
            </Link>
            <div>
              <span className={styles.time_ago}>
                {format(notification.date, "es_ES")}
              </span>
            </div>
          </div>
          <div
            onClick={() => onDeleteNotification(notification._id)}
            className={styles.button_close}
          >
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
            />
            <span class="material-symbols-outlined">close</span>
          </div>
        </li>
      )}
    </>
  );
};

export { Notification };
