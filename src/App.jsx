import React from "react";
import {
  Movies,
  Genres,
  MovieDetails,
  ActorDetails,
  Profile,
} from "./pages/export";
import { Routes, Route } from "react-router-dom";

import { Navbar, Footer } from "./components/export";
import ScrollToTop from "./utils/ScrollToTop";

export default function App() {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/movies/actors/:id" element={<ActorDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}
