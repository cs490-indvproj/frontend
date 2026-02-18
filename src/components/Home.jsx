import React from "react";
import TopFiveFilms from "./TopFiveFilms";
import TopFiveActors from "./TopFiveActors";

const Home = () => {
  return (
    <main className="bg-background flex min-h-screen flex-col gap-20 pt-30">
      <TopFiveFilms />
      <TopFiveActors />
    </main>
  );
};

export default Home;
