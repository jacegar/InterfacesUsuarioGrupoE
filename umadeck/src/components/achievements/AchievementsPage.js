import { useEffect, useState } from "react";
import GoBackArrow from "../common/GoBackArrow";
import Achievement from "../common/Achievement";
import "../styles/AchievementsPage.css";

function AchievementsPage() {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    fetch("/assets/achievements/achievements.json")
      .then((res) => res.json())
      .then((data) => setAchievements(data))
      .catch((error) => console.error("Error cargando logros:", error));
  }, []);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="achievements-container">
      <div className="achievements-header">
        <GoBackArrow />
        <h1>Logros</h1>
        <div className="achievement-count">{unlockedCount}/{achievements.length}</div>
      </div>

      <div className="achievements-grid">
        {achievements.map((achievement, index) => (
          <Achievement
            key={index}
            title={achievement.title}
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
