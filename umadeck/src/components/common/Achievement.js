import "../styles/Achievement.css";

function Achievement({ title, unlocked, date, img }) {
  return (
    <div className={`achievement-card ${unlocked ? "unlocked" : "locked"}`}>
      <img src={img} alt={title} className="achievement-image" />
      <p className="achievement-title">{title}</p>
    </div>
  );
}

export default Achievement;
