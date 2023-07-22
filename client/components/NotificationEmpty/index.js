import styles from "./NotificationEmpty.module.css";

const NotificationEmpty = ({}) => {
  return (
    <>
      <li className={styles.container__notifications}>
        <p>Sin notificaciones</p>
      </li>
    </>
  );
};

export { NotificationEmpty };
