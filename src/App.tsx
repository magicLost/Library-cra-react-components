import React from "react";
import logo from "./logo.svg";
import "./App.css";
import icons from "./static/icons/ICONS.svg";
import Button from "./component/UI/Button/Button";
import Logo from "./component/UI/Logo/Logo";
import LoginForm from "./container/Forms/LoginForm/LoginForm";
import ImageSharp from "./component/UI/ImageSharp";
import imagePath from "./static/images/sad-girl-1600.jpg";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <div style={{ width: "700px", margin: "20px auto" }}>
        <ImageSharp
          base64="data:image/jpg;base64, /9j/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAfADIDASIAAhEBAxEB/8QAGgAAAQUBAAAAAAAAAAAAAAAABwADBAYIBf/EADAQAAEDAwEGBAQHAAAAAAAAAAECAwQABRESBgcTITFhFSJBkhYjMlFUVWNxc4Hw/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ADgiVHPISGieyxTweaxniI9wrG6bzc0KymfIB/kNSU7R3kAJFxk++g18ZLCfqebH7rFNG5QUkgzGAR+oKybMuN4bU2V3J9fETnyuU/boF1uTL8kS3Q0zzWVOHJ7daAvb2VIubdsQw80/H4vzEoUCa7+xtystmsDcZVwYbwc6Cr6aBSZE5+Nwop4aPUrWSTUJ6wTSOIX0ebmcrNBqL4osf5nH91KsqeCyfxSPcaVAXIu5G3k5dmuKHaum3uUsQSAp50n70QGHRp9alJWDQDx/czZHUp0vOoKRyOaq+1Oy6djba4zAcXIK/O7qHRP+FG5SjpOnr6ZoeyR4jMvcC4p1SQySFDppwaAEyHsJC05TkZHeuxs8xa7glxm4S1MunGjJ5darM90h4sgYS0opH9VGW6SUkciKC+/CUE8xOHPvSqnpnPhIHEV0+9Kg/9k="
          src={imagePath}
          srcSet={"hello"}
        />
      </div>
    </div>
  );
}

export default App;
