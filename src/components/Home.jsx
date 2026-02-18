import React from "react";
import TopFiveFilms from "./TopFiveFilms";
import TopFiveActors from "./TopFiveActors";

const Home = () => {
  return (
    <main className="bg-background min-h-screen pt-25">
      <TopFiveFilms />
      <TopFiveActors />
    </main>
  );
};

export default Home;
