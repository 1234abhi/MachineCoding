import { useEffect, useState } from "react";
import "./styles.css";

const TOTAL = 9;
const GRID_SIZE = 3;

export default function GridLights() {
  const [activationOrder, setActivationOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const handleClick = (index) => {
    // TODO: Implement click logic
    if (activationOrder.includes(index) || isDeactivating) return;
    setActivationOrder((prev) => {
      const updated = [...prev, index];
      if (updated.length === TOTAL) setIsDeactivating(true);
      return updated;
    });
  };

  const startReverseDeactivation = () => {
    // TODO: Implement reverse deactivation
    let timer = setInterval(() => {
      setActivationOrder((prev) => {
        if (prev.length === 0) {
          clearInterval(timer);
          setIsDeactivating(false);
          return prev;
        }
        return prev.slice(0, -1);
      });
    }, 300);
  };

  const resetGrid = () => {
    // TODO: Implement reset logic
    setActivationOrder([]);
    setIsDeactivating(false);
  };

  useEffect(() => {
    if (isDeactivating) {
      startReverseDeactivation();
    }
  }, [isDeactivating]);

  return (
    <div className="main-container">
      <h1 className="grid-title">Grid Lights</h1>

      <div className="button-section">
        <button onClick={resetGrid} data-testid="reset-btn">
          Reset Grid
        </button>
      </div>

      <div className="cinema-hall" data-testid="grid-lights">
        {Array.from({ length: GRID_SIZE }, (_, rowIdx) => (
          <div className="row" key={rowIdx}>
            {Array.from({ length: GRID_SIZE }, (_, colIdx) => {
              const index = rowIdx * GRID_SIZE + colIdx;
              return (
                <div
                  key={index}
                  className={`cell col ${
                    activationOrder.includes(index) ? "active" : ""
                  } `}
                  onClick={() => handleClick(index)}
                  data-testid={`cell-${index}`}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
