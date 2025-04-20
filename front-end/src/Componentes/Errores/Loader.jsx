import React from "react";
import "../../../public/styles/Errores/Loader.css";

export const Loader = () => {
  return (
    <main className="main-container-loader">
      <div className="back">
        <div className="escena">
          <div className="cielo">
            <div className="sol"></div>
            <div className="nube nube1"></div>
            <div className="nube nube2"></div>
            <div className="nube nube3"></div>
            <div className="nube nube4"></div>
            <div className="nube nube5"></div>
            <div className="nube nube6"></div>
            <div className="nube nube7"></div>
          </div>

          <div className="colinas"></div>
          <div className="pastizal">
            <div className="brillito1"></div>
            <div className="brillito2"></div>
            <div className="brillito3"></div>
            <div className="brillito4"></div>
            <div className="brillito5"></div>
            <div className="brillito6"></div>
            <div className="brillito7"></div>
            <div className="brillito8"></div>
            <div className="brillito9"></div>
            <div className="brillito10"></div>
            <div className="brillito11"></div>
            <div className="brillito12"></div>
            <div className="brillito13"></div>
            <div className="brillito14"></div>
            <div className="brillito15"></div>
            <div className="brillito16"></div>
            <div className="brillito17"></div>
            <div className="brillito18"></div>
            <div className="brillito19"></div>
            <h1 className="carga" autoFocus>CARGANDO...</h1>
          </div>
        </div>
      </div>

      <div
        aria-label="Orange and tan hamster running in a metal wheel"
        role="img"
        className="wheel-and-hamster"
      >
        <div className="wheel"></div>
        <div className="hamster">
          <div className="hamster__body">
            <div className="hamster__head">
              <div className="hamster__ear"></div>
              <div className="hamster__eye"></div>
              <div className="hamster__nose"></div>
            </div>
            <div className="hamster__limb hamster__limb--fr"></div>
            <div className="hamster__limb hamster__limb--fl"></div>
            <div className="hamster__limb hamster__limb--br"></div>
            <div className="hamster__limb hamster__limb--bl"></div>
            <div className="hamster__tail"></div>
          </div>
        </div>
        <div className="spoke"></div>
      </div>
    </main>
  );
};
