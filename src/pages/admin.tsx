import { type GetServerSideProps } from "next";
import React from "react";
import { getServerAuthSession } from "../server/auth";
import Navbar from "../components/Navbar";
import QuestionWrapper from "../components/HeroSection/QuestionWrapper";

const Admin = () => {
  return (
    <>
      <Navbar />
      <QuestionWrapper />
    </>
  );
};

export default Admin;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await getServerAuthSession(context);
  if (data && data.user.role === "ADMIN") {
    return {
      props: {
        data,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
