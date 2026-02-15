import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="bg-surface border-secondary fixed h-auto w-full border-b">
      <nav
        className="flex items-center justify-between p-4 sm:mx-10 md:mx-20
          lg:mx-30 xl:mx-40"
      >
        <h1 className="text-primary text-5xl font-bold tracking-wider">
          FilmBuster
        </h1>
        <div className="text-foreground flex items-center justify-between gap-8">
          <NavLink
            to="/"
            className="hover:text-primary text-lg transition duration-300"
          >
            Home
          </NavLink>
          <NavLink
            className="hover:text-primary text-lg transition duration-300"
            to="/films"
          >
            Films
          </NavLink>
          <NavLink
            className="hover:text-primary text-lg transition duration-300"
            to="/customers"
          >
            Customers
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
