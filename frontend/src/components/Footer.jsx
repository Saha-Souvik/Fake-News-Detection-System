import React from "react";
import img from "../image/f-img.jpg";

const Footer = () => {
  return (
    <footer className="w-full text-white px-4 sm:px-6 md:px-12 py-6 bg-opacity-70 z-10">
      <div className="flex flex-row justify-between items-start gap-4 font-[Poppins] text-sm flex-nowrap">

        {/* Left section - About us */}
        <div className="w-1/2 min-w-0 space-y-1">
          <p className="font-bold text-xs sm:text-sm md:text-base lg:text-xl">About Us</p>
          <p className="text-xs sm:text-sm md:text-base">@ Souvik Saha</p>
          <p className="text-xs sm:text-sm md:text-base">@ SK Imran Ali</p>
          <p className="text-xs sm:text-sm md:text-base">@ Suvadeep Paul</p>
          <p className="text-xs sm:text-sm md:text-base">@ Angshu Biswas</p>
          <p className="font-bold pt-2 text-xs sm:text-sm md:text-base">© FIEM(GR-35)</p>
        </div>

        {/* Right section - Image and description */}
        <div className="w-1/2 min-w-0 flex items-start gap-3 lg:mt-20 lg:ml-175">
          <img
            src={img}
            alt="news"
            className="w-16 h-16 object-cover rounded-md flex-shrink-0"
          />
          <p className="text-xs sm:text-sm md:text-base leading-tight lg:mt-3">
            With growing news in online portal, connect with us for detecting the correct news.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
