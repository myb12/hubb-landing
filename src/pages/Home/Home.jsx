import React from "react";
import "./home.css";
import SmallTree from "../../assets/images/monstera-small.webp";
import MainSvg from "../../assets/images/svg/For_Device_1920x1080.svg";

const Home = () => {
  return (
    <div>
      <main className="main">
        <img src={MainSvg} alt=""  className="svg-el"/>
        <div className="leaf-text">
          <img src={SmallTree} alt="" className="small-leaf" />
        </div>
      </main>
    </div>
  );
};

export default Home;
