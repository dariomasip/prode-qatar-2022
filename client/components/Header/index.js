import useApi from "../../hooks/useApi";
import useAppContext from "../../Context";
import styles from "./Header.module.css";
import { useEffect, useState } from "react";
import Notifications from "../Modals/Notifications";
import { Notification } from "../Notification";
import useApiPost from "../../hooks/useApiPost";
import { NotificationEmpty } from "../NotificationEmpty";

const Header = () => {
  const { user } = useAppContext();
  const { token } = user;
  const [notificacionsApi] = useApi(
    "https://the-prophecy-game.rj.r.appspot.com/api/usuario/notificaciones",
    token
  );
  const [showModalNotifications, setShowModalNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isEmpty, setEmpty] = useState(false);

  useEffect(() => {
    setNotifications(notificacionsApi);
  }, [notificacionsApi]);

  useEffect(() => {
    if (!notificacionsApi.length) {
      setEmpty(true);
    }
  }, [notificacionsApi]);

  const confirmUser = (code, user, notification) => {
    useApiPost(
      `https://the-prophecy-game.rj.r.appspot.com/api/torneo/unirse-confirmacion/${code}/${user}/${notification}`,
      "",
      token
    );
    const newNotificacions = notifications.filter(
      (notificationi) => notificationi._id !== notification
    );

    setNotifications(newNotificacions);
  };

  const declineUser = (code, user, notification) => {
    useApiPost(
      `https://the-prophecy-game.rj.r.appspot.com/api/torneo/declinar-invitacion/${code}/${user}/${notification}`,
      "",
      token
    );
    const newNotificacions = notifications.filter(
      (notificationi) => notificationi._id !== notification
    );

    setNotifications(newNotificacions);
  };

  const deleteNotification = (notification) => {
    useApiPost(
      `https://the-prophecy-game.rj.r.appspot.com/api/usuario/notificacion/eliminar/${notification}`,
      "",
      token
    );

    const newNotificacions = notifications.filter(
      (notificationi) => notificationi._id !== notification
    );

    setNotifications(newNotificacions);
  };

  return (
    <header className={styles.header}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,500,1,0"
      />

      <Notifications show={showModalNotifications}>
        {!notifications.length ? (
          <NotificationEmpty />
        ) : (
          notifications.map((notification) => {
            return (
              <Notification
                onDeleteNotification={deleteNotification}
                onDeclineUser={declineUser}
                onConfimUser={confirmUser}
                notification={notification}
              />
            );
          })
        )}
      </Notifications>
      {notifications.length > 0 && (
        <span className={styles.numbers__notifications}>
          {notifications.length}
        </span>
      )}
      <span
        onClick={() => setShowModalNotifications(!showModalNotifications)}
        className="material-symbols-outlined"
      >
        notifications
      </span>
      <div className={styles.profile__header}>
        {/* <figure className={styles.profile__team__favorite}>
          <img
            className={styles.profile__flag}
            src="https://crests.football-data.org/762.svg"
            alt="flag picture"
          ></img>
          <p className={styles.title__item}>Tu equipo</p>
        </figure> */}
        <div>
          <h4 className={styles.profile}>{user.username}</h4>
        </div>
      </div>
    </header>
  );
};

export { Header };
