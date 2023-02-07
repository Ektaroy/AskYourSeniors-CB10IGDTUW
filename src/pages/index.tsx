import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import DetailModal from "../components/DetailsModal";
import Herosection from "../components/HeroSection";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  const { data: session } = useSession();
  return (
    <>
      <Navbar />
      {session?.user.id ? (
        <>{session?.user.year ? <Herosection /> : <DetailModal />}</>
      ) : (
        <button onClick={() => signIn("google")}>Sign In</button>
      )}
    </>
  );
};

export default Home;
