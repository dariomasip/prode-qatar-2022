import Head from "next/head";
import { Nav } from "../../components/Nav";
import { AppLayout } from "../../components/AppLayout";
import { Header } from "../../components/Header";
import { TorneoX1Layout } from "../../components/TorneoX1Layout";
import useApi from "../../hooks/useApi";
import { useAppContext } from "../../Context";
import { TorneoX1 } from "../../components/TorneoX1";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Explorar() {
  const { user } = useAppContext();
  const { token } = user;
  const [tournaments] = useApi(
    "https://the-prophecy-game.rj.r.appspot.com/api/torneos/explorar",
    token
  );
  const [valueSearch, setValueSearch] = useState("");
  const [filterData, setFilterData] = useState([]);
  console.log(
    "🚀 ~ file: explorar.js ~ line 18 ~ Explorar ~ filterData",
    filterData
  );

  useEffect(() => {
    setFilterData(tournaments);
  }, []);

  const handleInput = (e) => {
    setValueSearch(e.target.value);
  };

  useEffect(() => {
    setFilterData(
      tournaments.filter((tournament) => {
        if (valueSearch.length === 9) {
          return (
            tournament.title
              .toLowerCase()
              .replace(" ", "")
              .trim()
              .includes(valueSearch.toLowerCase().trim().replace(/ /g, "")) ||
            tournament.code
              .toLowerCase()
              .replace(" ", "")
              .trim()
              .includes(
                valueSearch.toLowerCase().trim().replace(/ /g, "").trim()
              )
          );
        } else {
          return tournament.title
            .toLowerCase()
            .replace(" ", "")
            .trim()
            .includes(valueSearch.toLowerCase().trim().replace(/ /g, ""));
        }
      })
    );
  }, [valueSearch]);

  return (
    <AppLayout>
      <Head>
        <title>Explorar | The Prophecy Game</title>
      </Head>
      <Nav />
      <Header />
      <TorneoX1Layout onHandleInput={handleInput} page="explorar">
        {filterData.length
          ? filterData.map((tournament) => {
              return (
                <Link href={`/torneos/${tournament.code}`}>
                  <a>
                    <TorneoX1 tournament={tournament} />
                  </a>
                </Link>
              );
            })
          : tournaments.map((tournament) => {
              console.log(tournament);
              return (
                <Link href={`/torneos/${tournament.code}`}>
                  <a>
                    <TorneoX1 tournament={tournament} />
                  </a>
                </Link>
              );
            })}
      </TorneoX1Layout>
    </AppLayout>
  );
}
