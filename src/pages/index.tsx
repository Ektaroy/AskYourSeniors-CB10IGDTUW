import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import DetailModal from "../components/DetailsModal";
import Herosection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import Homemain from "../components/Homemain";

const Home: NextPage = () => {
  const { data: session } = useSession();
  return (
    <>
      <Navbar />
      <Homemain />
    </>
  );
};

export default Home;
