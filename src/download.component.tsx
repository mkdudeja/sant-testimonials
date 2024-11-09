import React from "react";
import logoUrl from "./assets/images/logo.png";
import imgUrl from "./assets/images/samagam.png";

import ssidUrl from "./assets/images/ssid.png";
import ssid5gUrl from "./assets/images/ssid5g.png";
import downloadUrl from "./assets/images/download.png";

const Download: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen h-full overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <header className="flex items-center justify-between p-6">
          <img className="h-28 w-auto" src={logoUrl} alt="Kids Exhibition" />
          <h1 className="text-2xl font-bold text-white text-center underline">
            Download Instructions
          </h1>
          <img
            src={imgUrl}
            className="h-28 w-auto"
            alt="77th Nirankari Samagam"
          />
        </header>

        <div className="mx-auto max-w-3xl space-y-3 -mt-10">
          <div className="flex flex-col space-y-4">
            <div className="flex space-y-6 justify-start space-x-5 items-center">
              <h2 className="text-white text-2xl">Join Network:</h2>
              <img
                src={ssidUrl}
                className="w-48 max-h-full"
                alt="77th Nirankari Samagam"
              />
              <img
                src={ssid5gUrl}
                className="!ml-24 w-48 max-h-full"
                alt="77th Nirankari Samagam"
              />
            </div>
            <div className="flex space-y-6 items-center space-x-5">
              <h2 className="text-white text-2xl">Download:</h2>
              <img
                src={downloadUrl}
                className="w-48 max-h-full"
                alt="77th Nirankari Samagam"
              />
              <a
                href="http://192.168.1.2:8080/frontend/NirankariKids.apk"
                target="_blank"
                className="text-xl text-center underline text-red-600 hover:text-red-800 visited:text-purple-600"
              >
                http://192.168.1.2:8080/frontend/NirankariKids.apk
              </a>
            </div>
          </div>
        </div>

        <footer>
          <p className="text-white text-center text-base mt-10">
            77<sup>th</sup> Annual Nirankari Sant Samagam - Kids Exhibition,
            2024
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Download;
