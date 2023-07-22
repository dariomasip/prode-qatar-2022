import Head from "next/head";
import { useRouter } from "next/router";
import { AppLayout } from "../../components/AppLayout";
import { Header } from "../../components/Header";
import { Nav } from "../../components/Nav";
import { TorneoX2 } from "../../components/TorneoX2";
import { useAppContext } from "../../Context";
import useApi from "../../hooks/useApi";
import QuestionActions from "../../components/Modals/questionAction";
import { useEffect, useState } from "react";
import useApiPost from "../../hooks/useApiPost";

const DetailTournament = () => {
  const { user } = useAppContext();
  const { token } = user;
  const [showModalQuestionAction, setShowModalQuestionAction] = useState(false);

  const router = useRouter();
  const { torneo } = router.query;

  const [isLimit, setLimit] = useState(false);
  const [isSendRequest, setSendRequest] = useState(false);
  const [isParticipating, setParticipating] = useState(false);
  const [isJoinTournament, setJoinTournament] = useState(false);

  const [participants, setParticipants] = useState([]);
  const [joinRequests, setJoinRequest] = useState([]);

  const [tournament] = useApi(
    `https://the-prophecy-game.rj.r.appspot.com/api/torneos/${torneo}`,
    token
  );
  console.log(tournament);

  useEffect(() => {
    setJoinRequest(tournament.joinRequests);
  }, [tournament]);

  useEffect(() => {
    if (joinRequests?.filter((request) => request.user.id === user.id).length) {
      setSendRequest(true);
    } else {
      setSendRequest(false);
    }
  }, [tournament]);

  useEffect(() => {
    setParticipants(tournament.participants);

    if (
      participants?.length === 50 &&
      !participants?.filter((participant) => participant.id === user.id).length
    ) {
      setLimit(true);
    }
  }, [tournament]);

  useEffect(() => {
    console.group("Use Effect: isParticipant");
    console.log("Tournament --> ", tournament);
    console.log("user --> ", user);
    console.log(
      "Filter participant --> ",
      participants?.filter((participant) => participant.id === user.id)
    );
    console.log(
      "Result filter participant --> ",
      participants?.filter((participant) => participant.id === user.id).length
    );
    console.log({ isParticipating });
    console.groupEnd();
    if (
      participants?.filter((participant) => participant.id === user.id).length
    ) {
      setParticipating(true);
    } else {
      setParticipating(false);
    }
  }, [participants]);

  const content = {
    question: "¿Estás seguro que quieres abandonar el torneo",
    tournament: {
      code: tournament.code,
      title: tournament.title,
    },
  };

  const onLeaveTournament = () => {
    useApiPost(
      `https://the-prophecy-game.rj.r.appspot.com/api/torneo/abandonar/${tournament.code}`,
      "",
      token
    );
    setJoinRequest(false);
    setParticipating(false);
    setSendRequest(false);
    setParticipants(
      participants.filter((participant) => participant.id !== user.id)
    );
    setShowModalQuestionAction(false);
  };

  const onJoinTournament = () => {
    useApiPost(
      `https://the-prophecy-game.rj.r.appspot.com/api/torneo-abierto/unirse/${tournament.code}`,
      "",
      token
    )
      .then(() => setJoinTournament(true))
      .catch((e) => console.error(e));
  };

  const onJoinRequest = () => {
    useApiPost(
      `https://the-prophecy-game.rj.r.appspot.com/api/torneo/unirse/${tournament.code}`,
      "",
      token
    )
      .then(() => setSendRequest(true))
      .catch((e) => console.error(e));
  };

  const onCancelJoinRequest = () => {
    useApiPost(
      `https://the-prophecy-game.rj.r.appspot.com/api/torneo/cancelar-invitacion/${tournament.code}/${user.id}`,
      "",
      token
    );
    setSendRequest(false);
  };

  return (
    <AppLayout>
      <Head>
        <title>Torneo: {tournament.title} | The Prophecy Game</title>
      </Head>
      <Nav />
      <Header />
      <QuestionActions
        onLeave={onLeaveTournament}
        onClose={setShowModalQuestionAction}
        show={showModalQuestionAction}
        content={content}
      />
      <TorneoX2
        isLimit={isLimit}
        onCancelJoinRequest={onCancelJoinRequest}
        onJoinRequest={onJoinRequest}
        onJoinTournament={onJoinTournament}
        isSendRequest={isSendRequest}
        isParticipating={isParticipating}
        isJoinTournament={isJoinTournament}
        joinRequests={joinRequests}
        setJoinRequest={setJoinRequest}
        onShowModal={setShowModalQuestionAction}
        tournament={tournament}
      />
    </AppLayout>
  );
};

export default DetailTournament;
