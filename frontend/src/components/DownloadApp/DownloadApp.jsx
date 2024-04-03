import React from "react";
import "./DownloadApp.css";
import { assets } from "../../assets/assets";

const DownloadApp = () => {
  return (
    <div className="app-download " id="app-download">
      <p>
        For Better Experience download <br />
        Mobail App
      </p>
      <div className="app-download-platform">
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  );
};

export default DownloadApp;
