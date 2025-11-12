"use client";

import { Languages } from "lucide-react";
import { useState, useEffect } from "react";
import ReactCountryFlag from "react-country-flag";

export default function LanguageToggle() {
  const [lang, setLang] = useState("ar");

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) setLang(savedLang);
    document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
  }, []);

  const toggleLang = () => {
    const newLang = lang === "ar" ? "en" : "ar";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  return (
    <button
    onClick={toggleLang}
    className="  text-[#E7A24A] hover:cursor-pointer   hover:scale-120 hover:text-[#832411] transition-all duration-200   flex items-center justify-center"
    
    >
    
       <Languages size={35} className={''}  />
      {/* {lang === "ar" ? "English" : 'العربية'} */}
    </button>
  );
}
