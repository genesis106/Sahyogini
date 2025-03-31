import { Link } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  Calendar,
  FileText,
  Lightbulb,
  MessageSquare,
  Users,
  Video,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FinancialLiteracyPage() {
  const { language } = useLanguage();

  // Content object with English and Hindi translations
  const content = {
    en: {
      // Hero section
      heroTitle: "Financial Literacy & Mentorship",
      heroDescription: "Access educational resources, connect with mentors, and build the skills you need to succeed as a woman entrepreneur.",
      exploreResources: "Explore Resources",
      findMentor: "Find a Mentor",
      
      // Financial education section
      educationTitle: "Financial Education",
      educationDescription: "Build your financial knowledge with our comprehensive resources on budgeting, investments, loans, and tax compliance.",
      
      // Tabs
      courses: "Courses",
      articles: "Articles",
      videos: "Videos",
      tools: "Tools",
      
      // Course cards
      budgetingTitle: "Business Budgeting Basics",
      budgetingDescription: "Learn how to create and manage a business budget, track expenses, and plan for growth.",
      budgetingModules: "4 Modules • 2 Hours",
      startCourse: "Start Course",
      
      loansTitle: "Understanding Business Loans",
      loansDescription: "Understand different types of business loans, application processes, and repayment strategies.",
      loansModules: "5 Modules • 3 Hours",
      
      taxTitle: "Tax Compliance for Small Businesses",
      taxDescription: "Learn about tax regulations, filing requirements, and strategies to optimize your tax position.",
      taxModules: "6 Modules • 4 Hours",
      
      planningTitle: "Financial Planning for Growth",
      planningDescription: "Develop strategies for sustainable business growth, including reinvestment and expansion planning.",
      planningModules: "4 Modules • 2.5 Hours",
      
      viewAllCourses: "View All Courses",
      
      // Article cards
      mistakesTitle: "5 Financial Mistakes to Avoid as a New Entrepreneur",
      mistakesDescription: "Learn about common financial pitfalls and how to avoid them when starting your business.",
      readArticle: "Read Article",
      
      cashFlowTitle: "Understanding Cash Flow Management",
      cashFlowDescription: "A comprehensive guide to managing cash flow effectively in your small business.",
      
      schemesTitle: "Guide to Government Schemes for Women Entrepreneurs",
      schemesDescription: "Explore various government schemes and subsidies available for women entrepreneurs in India.",
      
      creditTitle: "Building Business Credit: A Step-by-Step Guide",
      creditDescription: "Learn how to establish and build business credit to improve your access to financing.",
      
      viewAllArticles: "View All Articles",
      
      // Video cards
      statementsTitle: "Financial Statements Explained",
      statementsDescription: "A simple explanation of balance sheets, income statements, and cash flow statements.",
      statementsLength: "15 Minutes",
      watchVideo: "Watch Video",
      
      pricingTitle: "Pricing Strategies for Small Businesses",
      pricingDescription: "Learn different pricing models and how to determine the right price for your products or services.",
      pricingLength: "20 Minutes",
      
      viewAllVideos: "View All Videos",
      
      // Tool cards
      loanCalcTitle: "AI-Powered Loan Calculator",
      loanCalcDescription: "Calculate loan payments, interest rates, and compare different loan options for your business.",
      useTool: "Use Tool",
      
      budgetTemplateTitle: "Business Budget Template",
      budgetTemplateDescription: "Download a customizable business budget template to track income, expenses, and cash flow.",
      downloadTemplate: "Download Template",
      
      fundingTitle: "Funding Suggestion Tool",
      fundingDescription: "Get personalized funding recommendations based on your business type, location, and financial needs.",
      
      riskTitle: "Business Risk Assessment",
      riskDescription: "Evaluate potential risks in your business and get recommendations for risk mitigation strategies.",
      startAssessment: "Start Assessment",
      
      viewAllTools: "View All Tools",
      
      // CTA Section
      ctaTitle: "Ready to Grow Your Business?",
      ctaDescription: "Join Sahyogini today to access all our financial literacy resources, connect with mentors, and become part of our supportive community.",
      signUpNow: "Sign Up Now",
      contactUs: "Contact Us"
    },
    hi: {
      // Hero section
      heroTitle: "वित्तीय साक्षरता और मेंटरशिप",
      heroDescription: "शैक्षिक संसाधनों तक पहुंचें, मेंटरों से जुड़ें, और एक महिला उद्यमी के रूप में सफल होने के लिए आवश्यक कौशल विकसित करें।",
      exploreResources: "संसाधन देखें",
      findMentor: "मेंटर ढूंढें",
      
      // Financial education section
      educationTitle: "वित्तीय शिक्षा",
      educationDescription: "बजट, निवेश, ऋण और कर अनुपालन पर हमारे व्यापक संसाधनों के साथ अपने वित्तीय ज्ञान का निर्माण करें।",
      
      // Tabs
      courses: "पाठ्यक्रम",
      articles: "लेख",
      videos: "वीडियो",
      tools: "उपकरण",
      
      // Course cards
      budgetingTitle: "व्यावसायिक बजट की मूल बातें",
      budgetingDescription: "व्यावसायिक बजट बनाना और प्रबंधित करना, खर्चों को ट्रैक करना और विकास की योजना बनाना सीखें।",
      budgetingModules: "4 मॉड्यूल • 2 घंटे",
      startCourse: "पाठ्यक्रम शुरू करें",
      
      loansTitle: "व्यावसायिक ऋण को समझना",
      loansDescription: "विभिन्न प्रकार के व्यावसायिक ऋणों, आवेदन प्रक्रियाओं और पुनर्भुगतान रणनीतियों को समझें।",
      loansModules: "5 मॉड्यूल • 3 घंटे",
      
      taxTitle: "छोटे व्यवसायों के लिए कर अनुपालन",
      taxDescription: "कर नियमों, फाइलिंग आवश्यकताओं और अपनी कर स्थिति को अनुकूलित करने की रणनीतियों के बारे में जानें।",
      taxModules: "6 मॉड्यूल • 4 घंटे",
      
      planningTitle: "विकास के लिए वित्तीय योजना",
      planningDescription: "पुनर्निवेश और विस्तार योजना सहित स्थायी व्यावसायिक विकास के लिए रणनीतियां विकसित करें।",
      planningModules: "4 मॉड्यूल • 2.5 घंटे",
      
      viewAllCourses: "सभी पाठ्यक्रम देखें",
      
      // Article cards
      mistakesTitle: "एक नए उद्यमी के रूप में टालने के लिए 5 वित्तीय गलतियां",
      mistakesDescription: "अपना व्यवसाय शुरू करते समय सामान्य वित्तीय चुनौतियों और उन्हें कैसे टालें, इसके बारे में जानें।",
      readArticle: "लेख पढ़ें",
      
      cashFlowTitle: "कैश फ्लो प्रबंधन को समझना",
      cashFlowDescription: "अपने छोटे व्यवसाय में कैश फ्लो को प्रभावी ढंग से प्रबंधित करने के लिए एक व्यापक मार्गदर्शिका।",
      
      schemesTitle: "महिला उद्यमियों के लिए सरकारी योजनाओं की मार्गदर्शिका",
      schemesDescription: "भारत में महिला उद्यमियों के लिए उपलब्ध विभिन्न सरकारी योजनाओं और सब्सिडी का पता लगाएं।",
      
      creditTitle: "व्यावसायिक क्रेडिट बनाना: एक चरण-दर-चरण मार्गदर्शिका",
      creditDescription: "अपनी वित्तपोषण तक पहुंच में सुधार के लिए व्यावसायिक क्रेडिट कैसे स्थापित करें और विकसित करें, यह जानें।",
      
      viewAllArticles: "सभी लेख देखें",
      
      // Video cards
      statementsTitle: "वित्तीय विवरण समझाया गया",
      statementsDescription: "बैलेंस शीट, आय विवरण और कैश फ्लो विवरण का एक सरल स्पष्टीकरण।",
      statementsLength: "15 मिनट",
      watchVideo: "वीडियो देखें",
      
      pricingTitle: "छोटे व्यवसायों के लिए मूल्य निर्धारण रणनीतियां",
      pricingDescription: "विभिन्न मूल्य निर्धारण मॉडल और अपने उत्पादों या सेवाओं के लिए सही मूल्य कैसे निर्धारित करें, यह जानें।",
      pricingLength: "20 मिनट",
      
      viewAllVideos: "सभी वीडियो देखें",
      
      // Tool cards
      loanCalcTitle: "AI-संचालित ऋण कैलकुलेटर",
      loanCalcDescription: "अपने व्यवसाय के लिए ऋण भुगतान, ब्याज दरों की गणना करें और विभिन्न ऋण विकल्पों की तुलना करें।",
      useTool: "उपकरण का उपयोग करें",
      
      budgetTemplateTitle: "व्यावसायिक बजट टेम्पलेट",
      budgetTemplateDescription: "आय, खर्च और नकदी प्रवाह को ट्रैक करने के लिए एक अनुकूलन योग्य व्यावसायिक बजट टेम्पलेट डाउनलोड करें।",
      downloadTemplate: "टेम्पलेट डाउनलोड करें",
      
      fundingTitle: "फंडिंग सुझाव उपकरण",
      fundingDescription: "अपने व्यवसाय के प्रकार, स्थान और वित्तीय जरूरतों के आधार पर व्यक्तिगत फंडिंग सिफारिशें प्राप्त करें।",
      
      riskTitle: "व्यावसायिक जोखिम मूल्यांकन",
      riskDescription: "अपने व्यवसाय में संभावित जोखिमों का मूल्यांकन करें और जोखिम कम करने की रणनीतियों के लिए सिफारिशें प्राप्त करें।",
      startAssessment: "मूल्यांकन शुरू करें",
      
      viewAllTools: "सभी उपकरण देखें",
      
      // CTA Section
      ctaTitle: "अपने व्यवसाय को विकसित करने के लिए तैयार हैं?",
      ctaDescription: "सहयोगिनी से आज ही जुड़ें और हमारे सभी वित्तीय साक्षरता संसाधनों तक पहुंचें, मेंटरों से जुड़ें और हमारे सहायक समुदाय का हिस्सा बनें।",
      signUpNow: "अभी साइन अप करें",
      contactUs: "संपर्क करें"
    }
  };

  // Use the content for current language
  const c = content[language];

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="flex flex-col space-y-6">
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{c.heroTitle}</h1>
              <p className="text-xl text-white/90">
                {c.heroDescription}
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link to="#resources">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                    {c.exploreResources}
                  </Button>
                </Link>
                <Link to="#mentorship">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-primary"
                  >
                    {c.findMentor}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] w-full rounded-lg shadow-xl">
              <img
                src="/women2.jpg"
                alt="Women entrepreneurs"
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Financial Education Section */}
      <section id="resources" className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">{c.educationTitle}</h2>
            <p className="text-lg text-gray-600">
              {c.educationDescription}
            </p>
          </div>

          <Tabs defaultValue="courses" className="mx-auto max-w-4xl">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="courses">{c.courses}</TabsTrigger>
              <TabsTrigger value="articles">{c.articles}</TabsTrigger>
              <TabsTrigger value="videos">{c.videos}</TabsTrigger>
              <TabsTrigger value="tools">{c.tools}</TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <BookOpen className="h-6 w-6 text-secondary" />
                    <CardTitle className="mt-2">{c.budgetingTitle}</CardTitle>
                    <CardDescription>{c.budgetingModules}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600">
                      {c.budgetingDescription}
                    </p>
                    <Link to="/courses/business-budgeting">
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        {c.startCourse}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <BookOpen className="h-6 w-6 text-secondary" />
                    <CardTitle className="mt-2">{c.loansTitle}</CardTitle>
                    <CardDescription>{c.loansModules}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600">
                      {c.loansDescription}
                    </p>
                    <Link to="/courses/business-loans">
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        {c.startCourse}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <BookOpen className="h-6 w-6 text-secondary" />
                    <CardTitle className="mt-2">{c.taxTitle}</CardTitle>
                    <CardDescription>{c.taxModules}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600">
                      {c.taxDescription}
                    </p>
                    <Link to="/courses/tax-compliance">
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        {c.startCourse}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <BookOpen className="h-6 w-6 text-secondary" />
                    <CardTitle className="mt-2">{c.planningTitle}</CardTitle>
                    <CardDescription>{c.planningModules}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600">
                      {c.planningDescription}
                    </p>
                    <Link to="/courses/financial-planning">
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        {c.startCourse}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 text-center">
                <Link to="/courses">
                  <Button className="bg-primary text-white hover:bg-primary/90">
                    {c.viewAllCourses} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="articles" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <FileText className="h-6 w-6 text-secondary" />
                    <CardTitle className="mt-2">{c.mistakesTitle}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600">
                      {c.mistakesDescription}
                    </p>
                    <Link to="/articles/financial-mistakes">
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        {c.readArticle}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <FileText className="h-6 w-6 text-secondary" />
                    <CardTitle className="mt-2">{c.cashFlowTitle}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600">
                      {c.cashFlowDescription}
                    </p>
                    <Link to="/articles/cash-flow-management">
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        {c.readArticle}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <FileText className="h-6 w-6 text-secondary" />
                    <CardTitle className="mt-2">{c.schemesTitle}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600">
                      {c.schemesDescription}
                    </p>
                    <Link to="/articles/government-schemes">
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        {c.readArticle}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <FileText className="h-6 w-6 text-secondary" />
                    <CardTitle className="mt-2">{c.creditTitle}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600">
                      {c.creditDescription}
                    </p>
                    <Link to="/articles/business-credit">
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        {c.readArticle}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 text-center">
                <Link to="/articles">
                  <Button className="bg-primary text-white hover:bg-primary/90">
                    {c.viewAllArticles} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="videos" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <Video className="h-6 w-6 text-secondary" />
                    <CardTitle className="mt-2">{c.statementsTitle}</CardTitle>
                    <CardDescription>{c.statementsLength}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600">
                      {c.statementsDescription}
                    </p>
                    <Link to="/videos/financial-statements">
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        {c.watchVideo}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <Video className="h-6 w-6 text-secondary" />
                    <CardTitle className="mt-2">{c.pricingTitle}</CardTitle>
                    <CardDescription>{c.pricingLength}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600">
                      {c.pricingDescription}
                    </p>
                    <Link to="/videos/pricing-strategies">
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        {c.watchVideo}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 text-center">
                <Link to="/videos">
                  <Button className="bg-primary text-white hover:bg-primary/90">
                    {c.viewAllVideos} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="tools" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <Calculator className="h-6 w-6 text-secondary" />
                    <CardTitle className="mt-2">{c.loanCalcTitle}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600">
                      {c.loanCalcDescription}
                    </p>
                    <Link to="/tools/loan-calculator">
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        {c.useTool}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <Calculator className="h-6 w-6 text-secondary" />
                    <CardTitle className="mt-2">{c.budgetTemplateTitle}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600">
                      {c.budgetTemplateDescription}
                    </p>
                    <Link to="/tools/budget-template">
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        {c.downloadTemplate}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <Calculator className="h-6 w-6 text-secondary" />
                    <CardTitle className="mt-2">{c.fundingTitle}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600">
                      {c.fundingDescription}
                    </p>
                    <Link to="/tools/funding-suggestions">
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        {c.useTool}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <Calculator className="h-6 w-6 text-secondary" />
                    <CardTitle className="mt-2">{c.riskTitle}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600">
                      {c.riskDescription}
                    </p>
                    <Link to="/tools/risk-assessment">
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        {c.startAssessment}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 text-center">
                <Link to="/tools">
                  <Button className="bg-primary text-white hover:bg-primary/90">
                    {c.viewAllTools} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">{c.ctaTitle}</h2>
            <p className="mb-8 text-lg text-white/90">
              {c.ctaDescription}
            </p>
            <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  {c.signUpNow}
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  {c.contactUs}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}