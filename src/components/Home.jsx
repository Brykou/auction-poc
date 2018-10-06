import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <Link
        className="w5 f6 link dim br1 ba bw1 ph3 pv2 dib purple"
        to={"/auction"}
      >
        Place auction
      </Link>
      <Link
        className="w5 f6 link dim br1 ba bw1 ph3 pv2 dib purple"
        to={"/bid"}
      >
        Place bid
      </Link>
    </div>
  );
}
