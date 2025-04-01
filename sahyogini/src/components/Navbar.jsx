import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "./ui/Button";
import { useLanguage } from "../context/LanguageContext";

const navLinks = {
  en: [
    { name: "Home", href: "/" },
    { name: "Investor Dashboard", href: "/investor-dashboard" },
    { name: "Business Dashboard", href: "/business-dashboard" },
    { name: "Financing Models", href: "/financing-models" },
    { name: "Financial Literacy", href: "/financial-literacy" },
    { name: "Mentorship", href: "/mentorship" },
  ],
  hi: [
    { name: "होम", href: "/" },
    { name: "निवेशक डैशबोर्ड", href: "/investor-dashboard" },
    { name: "व्यवसाय डैशबोर्ड", href: "/business-dashboard" },
    { name: "वित्तपोषण मॉडल", href: "/financing-models" },
    { name: "वित्तीय साक्षरता", href: "/financial-literacy" },
    { name: "मेंटॉरशिप", href: "/mentorship" },
  ],
};

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-1 lg:space-x-4">
          {navLinks[language].map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex md:items-center md:space-x-3">
          <Link to="/login">
            <Button
              variant="outline"
              className="border-primary text-primary transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:shadow-sm"
            >
              {language === "en" ? "Login" : "लॉगिन"}
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-primary text-white transition-all duration-200 hover:bg-primary/90 hover:shadow-md">
              {language === "en" ? "Sign Up" : "साइन अप"}
            </Button>
          </Link>
          <Button 
            onClick={toggleLanguage} 
            className="ml-2 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50"
          >
            {language === "en" ? "हिन्दी" : "English"}
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          className="rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="absolute w-full bg-white shadow-lg md:hidden">
          <div className="container mx-auto divide-y divide-gray-100 px-4 py-2">
            <div className="flex flex-col space-y-1 py-2">
              {navLinks[language].map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex flex-col space-y-3 py-3">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary/10 hover:text-primary"
                >
                  {language === "en" ? "Login" : "लॉगिन"}
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-primary text-white hover:bg-primary/90">
                  {language === "en" ? "Sign Up" : "साइन अप"}
                </Button>
              </Link>
              <Button 
                onClick={toggleLanguage} 
                className="w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              >
                {language === "en" ? "हिन्दी" : "English"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}