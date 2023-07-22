import Head from "next/head";
import { useRouter } from "next/router";
import { Nav } from "../components/Nav";
import { AppLayout } from "../components/AppLayout";
import { Header } from "../components/Header";
import { useEffect, useState } from "react";
import loginService from "../services/loginService";
import { FormLogin } from "../components/FormLogin";
import { useAppContext } from "../Context";

export default function Home() {
  const router = useRouter();
  const { user } = useAppContext();

  useEffect(() => {
    !user && router.push("/login");
  }, [user]);

  return (
    <AppLayout>
      <Head>
        <title>The Prophecy Game</title>
      </Head>
      <Nav />
      <Header />
    </AppLayout>
  );
}
