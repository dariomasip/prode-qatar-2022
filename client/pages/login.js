import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AppLayout } from "../components/AppLayout";
import { FormLogin } from "../components/FormLogin";
import { useAppContext } from "../Context";

export default function login() {
  const router = useRouter();
  const { user } = useAppContext();
  console.log({ user });

  useEffect(() => {
    user && router.push("/");
  }, [user]);

  return (
    <>
      <Head>
        <title>Iniciar sesión | The Prophecy Game</title>
      </Head>
      <FormLogin />
    </>
  );
}
