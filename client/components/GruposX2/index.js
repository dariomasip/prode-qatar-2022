import { useEffect } from "react";
import styles from "./GruposX2.module.css";

const GruposX2 = ({ children }) => {
    useEffect(() => {
        const scrollContainer = document.querySelector("main");
        scrollContainer.addEventListener("wheel", (event) => {
            event.preventDefault();
            scrollContainer.scrollLeft += event.deltaY;
        });
    }, []);

    return <main className={styles.container_groups}>{children}</main>;
};

export { GruposX2 };
