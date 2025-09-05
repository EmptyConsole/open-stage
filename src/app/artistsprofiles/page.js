"use client"


import styles from "./artistsprofiles.module.css";
import "../globals.css";
import { useState } from "react";

export default function HomePage() {
  const [isFollowing, setIsFollowing] = useState(false);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    
    <main className="main">
      <aside className={styles.mysidebar}>
        <div className={styles.sidebarContent}>
          {/* Image placeholder with follow button */}
          <div className={styles.imageContainer}>
            <div className={styles.imagePlaceholder}>
              <button 
                className={`${styles.followButton} ${isFollowing ? styles.following : ''}`}
                onClick={toggleFollow}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            </div>
            <div className={styles.descriptionText}>description...</div>
          </div>
          
          {/* Bottom content */}
          <div className={styles.bottomContent}>
            <div className={styles.quoteText}>
              One small step for you, one giant leap for Tooffu.
            </div>
            <button className={styles.supportButton}>
              Help Support!
            </button>
          </div>
        </div>
      </aside>
      <div className="header_main">
        <header className="header-container"> 
          <div className="header-bar">
            <div>Header content goes here</div>
          </div>
            <div className="main-content">Main content goes here</div>
        </header>
          
      </div>
    </main>
  );
}