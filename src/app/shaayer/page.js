"use client";
import SpecialButton from "@/components/SpecialButton";
import Sidebar from "@/components/sidebar.js";
import Button from "@/components/button.js";
import { useState } from "react";

export default function HomePage() {
  let [money, setMoney] = useState(0);

  function giveMoney() {
    setMoney(money + 1);
  }

  return (
    <main>
      <h1 className="ShyGuy">Shaayer</h1>
      <h2 className="ShyGuy">{money}</h2>
      <button onClick={giveMoney} className="ShyGuyButton">
        Click Me For Ez Cash!
      </button>

      <Sidebar />
    </main>
  );
}
