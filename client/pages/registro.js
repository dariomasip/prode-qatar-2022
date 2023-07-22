import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AppLayout } from "../components/AppLayout";
import { FormRegister } from "../components/FormRegister";
import { useAppContext } from "../Context";

export default function login() {
  const router = useRouter();
  const { user } = useAppContext();
  console.log({ user });

  return (
    <>
      <Head>
        <title>Registrarse | The Prophecy Game</title>
      </Head>
      <FormRegister />
    </>
  );
}
