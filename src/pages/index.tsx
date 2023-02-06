import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import DetailModal from "../components/DetailsModal";
import Heorsection from "../components/HeroSection";
import { useState } from "react";

const Home: NextPage = () => {
  const { data: session } = useSession();
  return (
    <>
      <Navbar />
      {session?.user.id ? (
        <>{session?.user.year ? <Heorsection /> : <DetailModal />}</>
      ) : (
        <button onClick={() => signIn("google")}>Sign In</button>
      )}
    </>
  );
};

export default Home;
