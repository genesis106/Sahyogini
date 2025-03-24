import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Logo } from "./Logo"; 

export function Footer() {
  return (
    <footer className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col space-y-4">
            <Logo />
            <p className="text-sm text-gray-600">
              Supporting women entrepreneurs with financial insights, funding opportunities, and business growth tools.
            </p>
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
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/financial-literacy" className="text-gray-600 hover:text-primary">
                  Financial Education
                </Link>
              </li>
              <li>
                <Link to="/mentorship" className="text-gray-600 hover:text-primary">
                  Mentorship Programs
                </Link>
              </li>
              <li>
                <Link to="/tools" className="text-gray-600 hover:text-primary">
                  Business Tools
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="text-gray-600 hover:text-primary">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-600 hover:text-primary">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-600 hover:text-primary">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} Sahyogini. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
