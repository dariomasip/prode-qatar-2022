import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Notifications.module.css";

export default function Notifications({ show, children }) {
  const [isBrowser, setBrowser] = useState(false);
  const [isSelect, setSelect] = useState(false);

  useEffect(() => {
    setBrowser(true);
  }, []);

  const modalContent = show ? (
    <div className={styles.container__notifications}>
      <ul>{children}</ul>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
}
