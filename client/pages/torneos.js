import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppContext } from "../Context";
import { AppLayoutGeneral } from "../components/AppLayout/AppLayoutGeneral";
import { Nav } from "../components/Nav";
import { Header } from "../components/Header";
import { TorneoX1Layout } from "../components/TorneoX1Layout";
import { TorneoX1 } from "../components/TorneoX1";
import useApi from "../hooks/useApi";
import Link from "next/link";
import QuestionAction from "../components/Modals/questionAction";

export default function login() {
  const router = useRouter();
  const { user } = useAppContext();
  const { token } = user;

  const [tournaments] = useApi(
    "https://the-prophecy-game.rj.r.appspot.com/api/torneos",
    token
  );

  console.log(tournaments);

  useEffect(() => {
    !user && router.push("/login");
  }, [user]);

  return (
    <AppLayoutGeneral>
      <Head>
        <title>Mis torneos - The Prophecy Game</title>
      </Head>
      <TorneoX1Layout length={tournaments?.length}>
        {tournaments.length &&
          tournaments?.map((tournament) => {
            return (
              <Link href={`/torneos/${tournament.code}`}>
                <a>
                  <TorneoX1
                    joinRequests={tournament.joinRequests}
                    tournament={tournament}
                  />
                </a>
              </Link>
            );
          })}
      </TorneoX1Layout>
      <Header />
      <Nav />
    </AppLayoutGeneral>
  );
}
