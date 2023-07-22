import Head from "next/head";
import { Nav } from "../components/Nav";
import { GrupoX1 } from "../components/GrupoX1";
import { AppLayout } from "../components/AppLayout";
import { GruposX1 } from "../components/GruposX1";
import { Header } from "../components/Header";
import useApi from "../hooks/useApi";
import Link from "next/link";

export default function Pronosticos() {
  const [scores] = useApi(
    "https://the-prophecy-game.rj.r.appspot.com/api/posiciones"
  );

  console.log(scores);

  const groupA = Array.from(scores.filter((team) => team[0] === "GROUP_A"));

  const groupB = Array.from(scores.filter((team) => team[0] === "GROUP_B"));

  const groupC = Array.from(scores.filter((team) => team[0] === "GROUP_C"));

  const groupD = Array.from(scores.filter((team) => team[0] === "GROUP_D"));

  const groupE = Array.from(scores.filter((team) => team[0] === "GROUP_E"));

  const groupF = Array.from(scores.filter((team) => team[0] === "GROUP_F"));

  const groupG = Array.from(scores.filter((team) => team[0] === "GROUP_G"));

  const groupH = Array.from(scores.filter((team) => team[0] === "GROUP_H"));

  console.log(groupA);

  return (
    <AppLayout>
      <Head>
        <title>Posiciones - The Prophecy Game</title>
      </Head>
      <Nav />
      <Header />
      <GruposX1>
        <GrupoX1 nameGroup="Grupo A" scores={groupA} />
        <GrupoX1 nameGroup="Grupo B" scores={groupB} />
        <GrupoX1 nameGroup="Grupo C" scores={groupC} />
        <GrupoX1 nameGroup="Grupo D" scores={groupD} />
        <GrupoX1 nameGroup="Grupo E" scores={groupE} />
        <GrupoX1 nameGroup="Grupo F" scores={groupF} />
        <GrupoX1 nameGroup="Grupo G" scores={groupG} />
        <GrupoX1 nameGroup="Grupo H" scores={groupH} />
      </GruposX1>
    </AppLayout>
  );
}
