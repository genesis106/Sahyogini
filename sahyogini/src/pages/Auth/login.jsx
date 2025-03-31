import { useState } from "react";
import { Link } from "react-router-dom"; // Assuming React Router is used
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "../../context/LanguageContext"; // Import the language context

export default function LoginPage() {
  const { language } = useLanguage(); // Get the current language from the context
  const [showPassword, setShowPassword] = useState(false);

  // Content object with translations for English and Hindi
  const content = {
    en: {
      backToHome: "Back to Home",
      welcomeBack: "Welcome Back!",
      welcomeMessage: "Log in to access your dashboard and continue your journey with Sahyogini.",
      login: "Login",
      email: "Email",
      password: "Password",
      forgotPassword: "Forgot password?",
      loginButton: "Login",
      orContinueWith: "Or continue with",
      google: "Google",
      facebook: "Facebook",
      noAccount: "Don't have an account?",
      signUp: "Sign up",
    },
    hi: {
      backToHome: "मुख्य पृष्ठ पर वापस जाएं",
      welcomeBack: "वापसी पर स्वागत है!",
      welcomeMessage: "अपने डैशबोर्ड तक पहुंचने और सहयोगिनी के साथ अपनी यात्रा जारी रखने के लिए लॉग इन करें।",
      login: "लॉगिन",
      email: "ईमेल",
      password: "पासवर्ड",
      forgotPassword: "पासवर्ड भूल गए?",
      loginButton: "लॉगिन करें",
      orContinueWith: "या इसके साथ जारी रखें",
      google: "गूगल",
      facebook: "फेसबुक",
      noAccount: "क्या आपके पास खाता नहीं है?",
      signUp: "साइन अप करें",
    },
  };

  // Use the content for the current language
  const c = content[language];

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container relative flex flex-1 items-center justify-center px-4 py-12 md:px-8">
        <Link
          to="/"
          className="absolute left-4 top-4 flex items-center text-sm font-medium text-gray-600 hover:text-primary md:left-8 md:top-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {c.backToHome}
        </Link>

        <div className="grid w-full max-w-[1200px] grid-cols-1 overflow-hidden rounded-xl shadow-lg md:grid-cols-2">
          {/* Image Section */}
          <div className="relative hidden md:block">
            <img
              src="/wlogin.jpeg"
              alt="Rural women entrepreneur"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-primary/30" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h2 className="mb-2 text-2xl font-bold">{c.welcomeBack}</h2>
              <p>{c.welcomeMessage}</p>
            </div>
          </div>

          {/* Login Form Section */}
          <Card className="border-0 shadow-none">
            <CardHeader className="space-y-1 pt-8">
              <CardTitle className="text-3xl font-bold">{c.login}</CardTitle>
              <CardDescription>{c.welcomeMessage}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{c.email}</Label>
                  <Input id="email" type="email" placeholder="name@example.com" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">{c.password}</Label>
                    <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                      {c.forgotPassword}
                    </Link>
                  </div>
                  <div className="relative">
                    <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" required />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-primary text-white hover:bg-primary/90">{c.loginButton}</Button>

              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative bg-white px-4 text-sm text-gray-500">{c.orContinueWith}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">{c.google}</Button>
                <Button variant="outline" className="w-full">{c.facebook}</Button>
              </div>

              <div className="text-center text-sm">
                {c.noAccount}{" "}
                <Link to="/signup" className="font-medium text-primary hover:underline">
                  {c.signUp}
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}