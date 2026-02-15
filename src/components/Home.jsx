import React from "react";

function Home() {
  fetch("http://127.0.0.1:5000/")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
  return (
    <main className="bg-background min-h-screen pt-20">
      <section className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-primary pt-0 text-center text-4xl font-extrabold">
          View our Top 5 Films
        </h1>
        <div className="bg-surface border-secondary h-1/2 w-1/2 border">
          <p>test</p>
        </div>
      </section>
    </main>
  );
}

export default Home;
