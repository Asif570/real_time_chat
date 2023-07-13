"use client";
import Image from "next/image";
import { useState } from "react";
import AuthForm from "./components/AuthForm/AuthForm";

const Home = () => {
  return (
    <div className=" flex justify-center bg-gray-100 w-full h-full min-h-full items-center sm:px-6 lg:px-8 py-12">
      <div className=" sm:mx-auto sm:max-w-md sm:w-full">
        <Image
          width={48}
          height={48}
          alt="Logo"
          src={"/facebook-messenger.png"}
          className=" mx-auto w-auto"
        />
        <h3 className=" text-3xl font-bold text-gray-950 tracking-tight capitalize mt-10 text-center ">
          welcome to <br /> REAL_TIME_CHAT
        </h3>
        <AuthForm />
      </div>
    </div>
  );
};
export default Home;
