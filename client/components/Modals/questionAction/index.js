import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./QuestionAction.module.css";

export default function QuestionAction({ show, content, onClose, onLeave }) {
  const [isBrowser, setBrowser] = useState(false);
  const [isSelect, setSelect] = useState(false);

  useEffect(() => {
    setBrowser(true);
  }, []);

  const modalContent = show ? (
    <div className={styles.container__question_action}>
      <div className={styles.content__question_action}>
        <div className={styles.warning__text}>
          <span>
            {content?.question}{" "}
            <span className={styles.text__destacated}>
              {content.tournament?.title}
            </span>{" "}
            (
            <span className={styles.text__destacated}>
              {content.tournament?.code}
            </span>
            )?
          </span>
        </div>
        <div>
          <button onClick={() => onLeave()} className={styles.button__confirm}>
            Confirmar
          </button>
          <button
            onClick={() => onClose(false)}
            className={styles.button__decline}
          >
            Cancelar
          </button>
        </div>
      </div>
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
