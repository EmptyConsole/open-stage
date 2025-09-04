"use client";

import Sidebar from "@/app/test/testcomponents/sidebar.js";
import SpecialButton from "@/app/test/testcomponents/SpecialButton.js";
import styles from "./components/stuff.module.css";
import { useState } from "react";

export default function HomePage() {
  let [isTextVisible, setIsTextVisible] = useState(true);

  function toggleTextVisibility() {
    setIsTextVisible(!isTextVisible);
  }

  return (
    <div className={styles.flex}>
      <main className={styles.main}>
        <h1 className={styles.hfang}>
          Welcome to .Fragmented_HF_ang.'s Page!!!
        </h1>
        {isTextVisible ? (
          <h1>Hi! This text should toggle when I press a button</h1>
        ) : (
          <></>
        )}
        <button className="ShyGuyButton" onClick={toggleTextVisibility}>
          Toggle Text
        </button>
        <Sidebar />
      </main>
    </div>
  );
}
