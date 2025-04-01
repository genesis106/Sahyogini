import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Logo } from "./logo";
import { useLanguage } from "../context/LanguageContext";

export function Footer() {
  const { language } = useLanguage(); // Get the current language from the context

  // Content object with translations for English and Hindi
  const content = {
    en: {
      description: "Supporting women entrepreneurs with financial insights, funding opportunities, and business growth tools.",
      resources: "Resources",
      financialEducation: "Financial Education",
      mentorshipPrograms: "Mentorship Programs",
      businessTools: "Business Tools",
      successStories: "Success Stories",
      company: "Company",
      aboutUs: "About Us",
      ourTeam: "Our Team",
      careers: "Careers",
      contactUs: "Contact Us",
      legal: "Legal",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      cookiePolicy: "Cookie Policy",
      copyright: "All rights reserved.",
    },
    hi: {
      description: "महिला उद्यमियों को वित्तीय जानकारी, फंडिंग के अवसर और व्यवसाय विकास उपकरण प्रदान करना।",
      resources: "संसाधन",
      financialEducation: "वित्तीय शिक्षा",
      mentorshipPrograms: "परामर्श कार्यक्रम",
      businessTools: "व्यवसाय उपकरण",
      successStories: "सफलता की कहानियां",
      company: "कंपनी",
      aboutUs: "हमारे बारे में",
      ourTeam: "हमारी टीम",
      careers: "करियर",
      contactUs: "संपर्क करें",
      legal: "कानूनी",
      privacyPolicy: "गोपनीयता नीति",
      termsOfService: "सेवा की शर्तें",
      cookiePolicy: "कुकी नीति",
      copyright: "सर्वाधिकार सुरक्षित।",
    },
  };

  // Use the content for the current language
  const c = content[language];

  return (
    <footer className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col space-y-4">
            <Logo />
            <p className="text-sm text-gray-600">{c.description}</p>
            <div className="flex space-x-4">
              <Link to="#" className="text-gray-500 hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link to="#" className="text-gray-500 hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link to="#" className="text-gray-500 hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link to="#" className="text-gray-500 hover:text-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">{c.resources}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/financial-literacy" className="text-gray-600 hover:text-primary">
                  {c.financialEducation}
                </Link>
              </li>
              <li>
                <Link to="/mentorship" className="text-gray-600 hover:text-primary">
                  {c.mentorshipPrograms}
                </Link>
              </li>
              <li>
                <Link to="/tools" className="text-gray-600 hover:text-primary">
                  {c.businessTools}
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="text-gray-600 hover:text-primary">
                  {c.successStories}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">{c.company}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary">
                  {c.aboutUs}
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-600 hover:text-primary">
                  {c.ourTeam}
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-primary">
                  {c.careers}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary">
                  {c.contactUs}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">{c.legal}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-primary">
                  {c.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-primary">
                  {c.termsOfService}
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-600 hover:text-primary">
                  {c.cookiePolicy}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} Sahyogini. {c.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}