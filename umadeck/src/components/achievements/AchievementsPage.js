import { useEffect, useState } from "react";
import GoBackArrow from "../common/GoBackArrow";
import Achievement from "../common/Achievement";
import "../styles/achievements/AchievementsPage.css";
import Player from "../../gamelogic/Player";

function AchievementsPage() {
  const [achievementData, setAchievementData] = useState([]);
  const player = new Player();
  const playerAchievements = player.getAchievements();

  useEffect(() => {
    fetch("/assets/achievements/achievements.json")
      .then((res) => res.json())
      .then((data) => {
        const updatedAchievements = data.map(achievement => {
          const playerProgress = playerAchievements[achievement.id] || { progress: 0, unlocked: false, date: null };
          return {
            ...achievement,
            progress: playerProgress.progress || 0,
            unlocked: playerProgress.unlocked || false,
            date: playerProgress.date || null
          };
        });
        setAchievementData(updatedAchievements);
      })
      .catch((error) => console.error("Error cargando logros:", error));
  }, []);

  const unlockedCount = achievementData.filter((a) => a.unlocked).length;

  return (
    <div className="achievements-container">
      <header className="achievements-header">
        <GoBackArrow />
        <h1>Logros</h1>
        <div className="achievement-count">{unlockedCount}/{achievementData.length}</div>
      </header>

      <div className="achievements-grid">
        {achievementData.map((achievement) => (
          <Achievement
            key={achievement.id}
            id={achievement.id}
            title={achievement.title}
            progress={achievement.progress}
            unlocked={achievement.unlocked}
            date={achievement.date}
            img={achievement.img}
          />
        ))}
      </div>
    </div>
  );
}

export default AchievementsPage;
