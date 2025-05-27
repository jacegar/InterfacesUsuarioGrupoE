import "../styles/common/Achievement.css";

function Achievement({ id, title, progress, unlocked, date, img }) {
  // Asegurarnos de que progress es un número
  const actualProgress = parseInt(progress) || 0;
  
  return (
    <div className={`achievement-card ${unlocked ? "unlocked" : "locked"}`}>
      <img src={img} alt={"Foto de " + title} className="achievement-image" />
      <h1 className="achievement-title">{title}</h1>
      
      {!unlocked && (
        <>
          <div className="achievement-progress-container">
            <div 
              className="achievement-progress-bar"
              style={{ width: `${actualProgress}%` }}
            />
          </div>
          <div className="achievement-progress-text">{actualProgress}%</div>
        </>
      )}
      
      {unlocked && date && (
        <p className="achievement-date">Obtenido: {new Date(date).toLocaleDateString()}</p>
      )}
    </div>
  );
}

export default Achievement;
