import React from "react";
import logo from "./logo.svg";
import "./App.css";
import icons from "./static/icons/ICONS.svg";
import Button from "./component/UI/Button/Button";
import Logo from "./component/UI/Logo/Logo";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <div style={{ padding: "20px" }}>
        <Button
          label="Hello"
          ariaLabel="Hello button"
          type="CONTAINED"
          onClick={() => console.log("click")}
        />
      </div>

      <div style={{ padding: "20px" }}>
        <Logo
          isHomepage={true}
          pathToIcon={icons + "#logo"}
          viewBox={"0 0 836 859.07"}
        />
      </div>
    </div>
  );
}

export default App;
