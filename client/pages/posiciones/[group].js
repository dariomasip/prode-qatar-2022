import Head from "next/head";
import { AppLayout } from "../../components/AppLayout";
import { GruposX2 } from "../../components/GruposX2";
import { GrupoX2 } from "../../components/GrupoX2";
import { Header } from "../../components/Header";
import { Nav } from "../../components/Nav";
import useApi from "../../hooks/useApi";

const Group = () => {
  const [scores] = useApi(
    "https://the-prophecy-game.rj.r.appspot.com/api/posiciones/details"
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

  return (
    <AppLayout>
      <Head>
        <title>Grupos - Posiciones - The Prophecy Game</title>
      </Head>
      <Nav />
      <Header />
      <GruposX2>
        <GrupoX2 group="Grupo A" scores={groupA} />
        <GrupoX2 group="Grupo B" scores={groupB} />
        <GrupoX2 group="Grupo C" scores={groupC} />
        <GrupoX2 group="Grupo D" scores={groupD} />
        <GrupoX2 group="Grupo E" scores={groupE} />
        <GrupoX2 group="Grupo F" scores={groupF} />
        <GrupoX2 group="Grupo G" scores={groupG} />
        <GrupoX2 group="Grupo H" scores={groupH} />
      </GruposX2>
    </AppLayout>
  );
};

export default Group;
