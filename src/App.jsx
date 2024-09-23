import React from "react";
import { AquariumButton } from "./components/AquariumButton";

function App() {
  const [key, setKey] = React.useState(0);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [buttonLabel, setButtonLabel] = React.useState("Aquarium Button");

  return (
    <>
      <AquariumButton
        key={key}
        label={buttonLabel}
        onClick={() => {}}
        isDisabled={isDisabled}
      />
      <div className="controls">
        <button onClick={() => setKey((key) => key + 1)}>Randomize Fish</button>
        <span>
          <label htmlFor="disable-button">Disabled: </label>
          <input
            id="disable-button"
            name="disable-button"
            type="checkbox"
            checked={isDisabled}
            onChange={() => setIsDisabled((d) => !d)}
          />
        </span>
        <span>
          <label htmlFor="button-label">Label: </label>
          <input
            id="button-label"
            name="button-label"
            type="text"
            value={buttonLabel}
            onChange={(e) => setButtonLabel(e.target.value)}
          />
        </span>
      </div>
    </>
  );
}

export default App;
