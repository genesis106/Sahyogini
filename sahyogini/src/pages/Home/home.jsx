import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, BookOpen, CreditCard, HandHeart, LineChart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "../../context/LanguageContext";

export default function Home() {
  const { language } = useLanguage();

  const content = {
    en: {
      hero: {
        title: "Empowering <span>Women</span> Entrepreneurs",
        description: "Sahyogini connects women entrepreneurs with investors and provides financial insights, funding opportunities, and business growth tools.",
        getStarted: "Get Started",
        learnMore: "Learn More"
      },
      features: {
        title: "Key Features",
        description: "Sahyogini provides a comprehensive platform for both investors and women entrepreneurs.",
        items: [
          { icon: <BarChart3 className="h-10 w-10 text-secondary" />, title: "Investor Dashboard", description: "Track your investments, monitor portfolio performance, and access reports on funded businesses." },
          { icon: <LineChart className="h-10 w-10 text-secondary" />, title: "Business Dashboard", description: "Apply for funding, track revenue, and receive AI-driven financial insights to grow your business." },
          { icon: <CreditCard className="h-10 w-10 text-secondary" />, title: "Alternative Financing", description: "Access revenue-based financing, P2P lending, crowdfunding, and microfinance options tailored to your needs." },
          { icon: <BookOpen className="h-10 w-10 text-secondary" />, title: "Financial Literacy", description: "Learn about budgeting, investments, loans, and tax compliance through our educational resources." },
          { icon: <Users className="h-10 w-10 text-secondary" />, title: "Mentorship", description: "Connect with experienced mentors, attend workshops, and learn from success stories of other entrepreneurs." },
          { icon: <HandHeart className="h-10 w-10 text-secondary" />, title: "Community Support", description: "Join our community of women entrepreneurs, share experiences, and grow together through mutual support." }
        ]
      },
      cta: {
        title: "Ready to Start Your Journey?",
        description: "Join Sahyogini today and connect with investors, access funding, and grow your business with our support.",
        signUp: "Sign Up Now",
        contact: "Contact Us"
      }
    },
    hi: {
      hero: {
        title: "महिला <span>उद्यमियों</span> को सशक्त बनाना",
        description: "सहयोगिनी महिला उद्यमियों को निवेशकों से जोड़ती है और वित्तीय अंतर्दृष्टि, फंडिंग के अवसर और व्यापार विकास उपकरण प्रदान करती है।",
        getStarted: "शुरू करें",
        learnMore: "और जानें"
      },
      features: {
        title: "मुख्य विशेषताएं",
        description: "सहयोगिनी निवेशकों और महिला उद्यमियों दोनों के लिए एक व्यापक प्लेटफॉर्म प्रदान करती है।",
        items: [
          { icon: <BarChart3 className="h-10 w-10 text-secondary" />, title: "निवेशक डैशबोर्ड", description: "अपने निवेशों पर नज़र रखें, पोर्टफोलियो प्रदर्शन की निगरानी करें, और वित्त पोषित व्यवसायों पर रिपोर्ट देखें।" },
          { icon: <LineChart className="h-10 w-10 text-secondary" />, title: "व्यवसाय डैशबोर्ड", description: "फंडिंग के लिए आवेदन करें, राजस्व पर नज़र रखें, और अपने व्यवसाय को बढ़ाने के लिए AI-संचालित वित्तीय अंतर्दृष्टि प्राप्त करें।" },
          { icon: <CreditCard className="h-10 w-10 text-secondary" />, title: "वैकल्पिक वित्तपोषण", description: "आपकी आवश्यकताओं के अनुरूप राजस्व-आधारित वित्तपोषण, P2P उधार, क्राउडफंडिंग और माइक्रोफाइनेंस विकल्पों तक पहुंच प्राप्त करें।" },
          { icon: <BookOpen className="h-10 w-10 text-secondary" />, title: "वित्तीय साक्षरता", description: "हमारे शैक्षिक संसाधनों के माध्यम से बजट, निवेश, ऋण और कर अनुपालन के बारे में जानें।" },
          { icon: <Users className="h-10 w-10 text-secondary" />, title: "मेंटरशिप", description: "अनुभवी मेंटर्स से जुड़ें, वर्कशॉप में भाग लें, और अन्य उद्यमियों की सफलता की कहानियों से सीखें।" },
          { icon: <HandHeart className="h-10 w-10 text-secondary" />, title: "सामुदायिक समर्थन", description: "महिला उद्यमियों के हमारे समुदाय से जुड़ें, अनुभव साझा करें, और आपसी सहयोग से एक साथ विकास करें।" }
        ]
      },
      cta: {
        title: "अपनी यात्रा शुरू करने के लिए तैयार हैं?",
        description: "आज ही सहयोगिनी से जुड़ें और निवेशकों से जुड़ें, फंडिंग प्राप्त करें, और हमारे समर्थन से अपने व्यवसाय का विकास करें।",
        signUp: "अभी साइन अप करें",
        contact: "हमसे संपर्क करें"
      }
    }
  };

  const currentContent = content[language];

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="flex flex-col space-y-6">
              <h1 
                className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
                dangerouslySetInnerHTML={{ 
                  __html: currentContent.hero.title.replace(
                    "<span>", 
                    "<span class='text-primary'>"
                  ) 
                }}
              />
              <p className="text-xl text-gray-600">
                {currentContent.hero.description}
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link to="/signup">
                  <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                    {currentContent.hero.getStarted}
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="border-primary text-primary transition-all duration-200 hover:bg-primary/10 hover:text-primary">
                    {currentContent.hero.learnMore}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] w-full overflow-hidden rounded-lg shadow-xl">
              <img
                src="/women1.jpg"
                alt="Women entrepreneurs"
                className="h-full w-full rounded-lg object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              {currentContent.features.title}
            </h2>
            <p className="text-lg text-gray-600">
              {currentContent.features.description}
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {currentContent.features.items.map((feature, index) => (
              <Card key={index} className="group transition-all duration-300 hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="transition-transform duration-300 group-hover:scale-110">{feature.icon}</div>
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4 text-center md:px-8">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">{currentContent.cta.title}</h2>
          <p className="mb-8 text-lg text-white/90">
            {currentContent.cta.description}
          </p>
          <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-primary transition-all duration-200 hover:bg-white/90 hover:shadow-md">
                {currentContent.cta.signUp}
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white transition-all duration-200 hover:bg-white/20">
                {currentContent.cta.contact}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}