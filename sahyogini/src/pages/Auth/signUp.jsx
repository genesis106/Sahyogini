import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLanguage } from "../../context/LanguageContext"; // Import the language context

export default function SignupPage() {
  const { language } = useLanguage(); // Get the current language from the context
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("entrepreneur");

  // Content object with translations for English and Hindi
  const content = {
    en: {
      backToHome: "Back to Home",
      joinSahyogini: "Join Sahyogini",
      joinMessage: "Create an account to connect with investors, access funding, and grow your business.",
      signUp: "Sign Up",
      signUpMessage: "Create an account to get started with Sahyogini",
      entrepreneur: "Entrepreneur",
      entrepreneurDescription: "I want to grow my business",
      investor: "Investor",
      investorDescription: "I want to invest in women entrepreneurs",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      password: "Password",
      passwordHint: "Password must be at least 8 characters long",
      referralCode: "Referral Code (Optional)",
      createAccount: "Create Account",
      alreadyHaveAccount: "Already have an account?",
      logIn: "Log in",
    },
    hi: {
      backToHome: "मुख्य पृष्ठ पर वापस जाएं",
      joinSahyogini: "सहयोगिनी से जुड़ें",
      joinMessage: "खाता बनाएं, निवेशकों से जुड़ें, फंडिंग प्राप्त करें और अपना व्यवसाय बढ़ाएं।",
      signUp: "साइन अप करें",
      signUpMessage: "सहयोगिनी के साथ शुरुआत करने के लिए खाता बनाएं",
      entrepreneur: "उद्यमी",
      entrepreneurDescription: "मैं अपना व्यवसाय बढ़ाना चाहता/चाहती हूं",
      investor: "निवेशक",
      investorDescription: "मैं महिला उद्यमियों में निवेश करना चाहता/चाहती हूं",
      firstName: "पहला नाम",
      lastName: "अंतिम नाम",
      email: "ईमेल",
      password: "पासवर्ड",
      passwordHint: "पासवर्ड कम से कम 8 वर्णों का होना चाहिए",
      referralCode: "रेफरल कोड (वैकल्पिक)",
      createAccount: "खाता बनाएं",
      alreadyHaveAccount: "क्या आपके पास पहले से खाता है?",
      logIn: "लॉग इन करें",
    },
  };

  // Use the content for the current language
  const c = content[language];

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container relative flex flex-1 items-center justify-center px-4 py-12 md:px-8">
        <a
          href="/"
          className="absolute left-4 top-4 flex items-center text-sm font-medium text-gray-600 hover:text-primary md:left-8 md:top-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {c.backToHome}
        </a>

        <div className="grid w-full max-w-[1200px] grid-cols-1 overflow-hidden rounded-xl shadow-lg md:grid-cols-2">
          {/* Image Section */}
          <div className="relative hidden md:block">
            <img
              src="/wsign.jpg?height=600&width=600"
              alt="Rural women entrepreneur"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-primary/30" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h2 className="mb-2 text-2xl font-bold">{c.joinSahyogini}</h2>
              <p>{c.joinMessage}</p>
            </div>
          </div>

          {/* Signup Form Section */}
          <Card className="border-0 shadow-none">
            <CardHeader className="space-y-1 pt-8">
              <CardTitle className="text-3xl font-bold">{c.signUp}</CardTitle>
              <CardDescription>{c.signUpMessage}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup defaultValue={userType} onChange={(e) => setUserType(e.target.value)} className="grid grid-cols-2 gap-4">
                <div>
                  <RadioGroupItem value="entrepreneur" id="entrepreneur" className="peer sr-only" />
                  <Label htmlFor="entrepreneur" className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-primary">
                    <span className="mb-2 font-medium">{c.entrepreneur}</span>
                    <span className="text-xs text-gray-500">{c.entrepreneurDescription}</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="investor" id="investor" className="peer sr-only" />
                  <Label htmlFor="investor" className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-primary">
                    <span className="mb-2 font-medium">{c.investor}</span>
                    <span className="text-xs text-gray-500">{c.investorDescription}</span>
                  </Label>
                </div>
              </RadioGroup>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">{c.firstName}</Label>
                  <Input id="first-name" placeholder={c.firstName} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">{c.lastName}</Label>
                  <Input id="last-name" placeholder={c.lastName} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{c.email}</Label>
                <Input id="email" type="email" placeholder="name@example.com" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{c.password}</Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder={c.password} required />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500">{c.passwordHint}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="referral">{c.referralCode}</Label>
                <Input id="referral" placeholder={c.referralCode} />
              </div>

              <Button className="w-full bg-primary text-white hover:bg-primary/90">{c.createAccount}</Button>

              <div className="text-center text-sm">
                {c.alreadyHaveAccount}{" "}
                <a href="/login" className="font-medium text-primary hover:underline">
                  {c.logIn}
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}