import styles from "./Nav.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const Nav = () => {
  const { pathname } = useRouter();

  return (
    <>
      <nav className={styles.nav__container}>
        <ul className={styles.nav__list}>
          <Link href="/">
            <a
              className={`${styles.nav__item} ${
                pathname === "/" && `${styles.active__item}`
              }`}
            >
              <li>Inicio</li>
            </a>
          </Link>
          <Link href="/pronosticos">
            <a
              className={`${styles.nav__item} ${
                pathname === "/pronosticos" && `${styles.active__item}`
              }`}
            >
              <li>Pronósticos</li>
            </a>
          </Link>
          <Link href="/torneos">
            <a
              className={`${styles.nav__item} ${
                (pathname === "/torneos" ||
                  pathname === "/torneos/[torneo]" ||
                  pathname === "/torneos/explorar") &&
                `${styles.active__item}`
              }`}
            >
              <li>Torneos</li>
            </a>
          </Link>
          {/* <Link href="/posiciones">
            <a
              className={`${styles.nav__item} ${
                pathname === "/posiciones" && `${styles.active__item}`
              }
                            }`}
            >
              <li>Posiciones</li>
            </a>
          </Link> */}
        </ul>
      </nav>
    </>
  );
};

export { Nav };
