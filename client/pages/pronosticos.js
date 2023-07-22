import Head from "next/head";
import { Nav } from "../components/Nav";
import { AppLayout } from "../components/AppLayout";
import { GruposX1 } from "../components/GruposX1";
import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import Link from "next/link";
import { MatchesLayout } from "../components/MatchesLayout";
import { Matches } from "../components/Matches";
import useApi from "../hooks/useApi";
import flagsData from "../flagsData.json";
import { useAppContext } from "../Context";
import { useRouter } from "next/router";

export default function Pronosticos() {
  const { user } = useAppContext();
  const router = useRouter();
  useEffect(() => {
    !user && router.push("/login");
  }, [user]);

  const { token } = user;

  const [matchesApi] = useApi(
    "https://the-prophecy-game.rj.r.appspot.com/api/partidos",
    token
  );

  const [predictionsUser] = useApi(
    "https://the-prophecy-game.rj.r.appspot.com/api/pronosticos",
    token
  );

  const [matches, setMatches] = useState([]);
  const [currentJornada, setCurrentJornada] = useState(1);
  const [isFilledInputs, setFilledInputs] = useState(0);

  useEffect(() => {
    const matchesOrdened = matchesApi.sort((a, b) => {
      if (a.utcDate > b.utcDate) {
        return 1;
      }

      if (a.utcDate < b.utcDate) {
        return -1;
      }
      return 0;
    });

    setMatches(matchesOrdened);
  }, [matchesApi]);

  useEffect(() => {
    const matchesFilterJornada = matchesApi.filter(
      (match) =>
        match.matchday === currentJornada || match.stage === currentJornada
    );

    setMatches(matchesFilterJornada);
  }, [matchesApi, currentJornada]);

  const onChangeJornada = (jornada) => {
    setCurrentJornada(jornada);
  };

  return (
    <AppLayout>
      <Head>
        <title>Mis pronósticos - The Prophecy Game</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Head>
      <Nav />
      <Header />
      <MatchesLayout
        currentJornada={currentJornada}
        onChangeJornada={onChangeJornada}
      >
        {!!matches &&
          matches.map((match) => {
            const flagsFilter = {
              home: flagsData.filter(
                (data) => data.id === match?.homeTeam.id
              )[0],
              away: flagsData.filter(
                (data) => data.id === match?.awayTeam.id
              )[0],
            };
            const prediction = predictionsUser?.filter(
              (data) =>
                data.match?.id === match?.id && match.stage === currentJornada
            );

            const predictionUser = {
              home: prediction ? prediction[0]?.score.homeTeam : null,
              away: prediction ? prediction[0]?.score.awayTeam : null,
              result: prediction ? prediction[0]?.result : null,
            };

            return (
              <Matches
                onChangeJornada={() => onChangeJornada()}
                flags={flagsFilter}
                match={match}
                prediction={predictionUser}
              />
            );
          })}
      </MatchesLayout>
    </AppLayout>
  );
}
