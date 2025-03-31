import { useState } from "react";
import { Link } from "react-router-dom";
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
      // Mentorship Section
      mentorshipTitle: "Mentorship & Networking",
      mentorshipDescription: "Connect with experienced mentors, attend workshops, and learn from success stories of other entrepreneurs.",
      
      // Mentor Card
      mentorCardTitle: "1-on-1 Mentor Matching",
      mentorCardDescription: "Get matched with an experienced mentor based on your industry, goals, and challenges. Receive personalized guidance and support.",
      findMentorButton: "Find a Mentor",
      
      // Workshop Card
      workshopCardTitle: "Live Workshops",
      workshopCardDescription: "Participate in interactive workshops led by industry experts on various aspects of business and financial management.",
      workshopsButton: "Upcoming Workshops",
      
      // Success Stories Card
      storiesCardTitle: "Success Stories",
      storiesCardDescription: "Read inspiring stories of women entrepreneurs who have overcome challenges and built successful businesses.",
      storiesButton: "Read Stories",
      
      // Community Section
      communityTitle: "Community & Resources",
      communityDescription: "Join our community of women entrepreneurs, share experiences, and access valuable resources.",
      
      // Discussion Forums Card
      forumsCardTitle: "Discussion Forums",
      forumsCardDescription: "Connect with other women entrepreneurs, ask questions, share insights, and learn from each other's experiences.",
      businessStrategyTitle: "Business Strategy",
      businessStrategyDescription: "Discuss business models, growth strategies, and market positioning.",
      financialManagementTitle: "Financial Management",
      financialManagementDescription: "Share tips on budgeting, accounting, and financial planning.",
      marketingTitle: "Marketing & Sales",
      marketingDescription: "Exchange ideas on customer acquisition, branding, and sales strategies.",
      joinForumTitle: "💬 Join the Discussion Forum!",
      joinForumDescription: "Connect with other women entrepreneurs to ask financial questions & share advice.",
      joinForumButton: "Join the Discussion",
      
      // Resource Library Card
      resourcesCardTitle: "Resource Library",
      resourcesCardDescription: "Access a comprehensive library of resources including case studies, templates, guides, and more.",
      caseStudiesTitle: "Case Studies",
      caseStudiesDescription: "In-depth analyses of successful women-led businesses across various sectors.",
      templatesTitle: "Business Templates",
      templatesDescription: "Ready-to-use templates for business plans, financial projections, and more.",
      learningToolsTitle: "Interactive Learning Tools",
      learningToolsDescription: "Quizzes, assessments, and interactive modules to test and build your knowledge.",
      exploreResourcesButton: "Explore Resources",
    },
    hi: {
      // Mentorship Section
      mentorshipTitle: "मेंटरशिप और नेटवर्किंग",
      mentorshipDescription: "अनुभवी मेंटर्स से जुड़ें, वर्कशॉप में भाग लें, और अन्य उद्यमियों की सफलता की कहानियों से सीखें।",
      
      // Mentor Card
      mentorCardTitle: "1-ऑन-1 मेंटर मैचिंग",
      mentorCardDescription: "अपने उद्योग, लक्ष्यों और चुनौतियों के आधार पर अनुभवी मेंटर से जुड़ें। व्यक्तिगत मार्गदर्शन और सहायता प्राप्त करें।",
      findMentorButton: "मेंटर खोजें",
      
      // Workshop Card
      workshopCardTitle: "लाइव वर्कशॉप",
      workshopCardDescription: "व्यापार और वित्तीय प्रबंधन के विभिन्न पहलुओं पर उद्योग विशेषज्ञों द्वारा आयोजित इंटरैक्टिव वर्कशॉप में भाग लें।",
      workshopsButton: "आगामी वर्कशॉप",
      
      // Success Stories Card
      storiesCardTitle: "सफलता की कहानियां",
      storiesCardDescription: "महिला उद्यमियों की प्रेरणादायक कहानियां पढ़ें जिन्होंने चुनौतियों को पार करके सफल व्यवसाय बनाए हैं।",
      storiesButton: "कहानियां पढ़ें",
      
      // Community Section
      communityTitle: "समुदाय और संसाधन",
      communityDescription: "महिला उद्यमियों के हमारे समुदाय से जुड़ें, अनुभवों को साझा करें, और मूल्यवान संसाधनों तक पहुंच प्राप्त करें।",
      
      // Discussion Forums Card
      forumsCardTitle: "चर्चा मंच",
      forumsCardDescription: "अन्य महिला उद्यमियों से जुड़ें, प्रश्न पूछें, अंतर्दृष्टि साझा करें, और एक-दूसरे के अनुभवों से सीखें।",
      businessStrategyTitle: "व्यापार रणनीति",
      businessStrategyDescription: "व्यापार मॉडल, विकास रणनीतियों और बाजार स्थिति पर चर्चा करें।",
      financialManagementTitle: "वित्तीय प्रबंधन",
      financialManagementDescription: "बजट, लेखांकन और वित्तीय योजना पर युक्तियां साझा करें।",
      marketingTitle: "मार्केटिंग और बिक्री",
      marketingDescription: "ग्राहक अधिग्रहण, ब्रांडिंग और बिक्री रणनीतियों पर विचारों का आदान-प्रदान करें।",
      joinForumTitle: "💬 चर्चा मंच से जुड़ें!",
      joinForumDescription: "वित्तीय प्रश्न पूछने और सलाह साझा करने के लिए अन्य महिला उद्यमियों से जुड़ें।",
      joinForumButton: "चर्चा से जुड़ें",
      
      // Resource Library Card
      resourcesCardTitle: "संसाधन पुस्तकालय",
      resourcesCardDescription: "केस स्टडीज, टेम्प्लेट्स, गाइड्स और अधिक सहित संसाधनों के व्यापक पुस्तकालय तक पहुंच प्राप्त करें।",
      caseStudiesTitle: "केस स्टडीज",
      caseStudiesDescription: "विभिन्न क्षेत्रों में सफल महिला-नेतृत्व वाले व्यवसायों का गहन विश्लेषण।",
      templatesTitle: "व्यापार टेम्प्लेट्स",
      templatesDescription: "व्यापार योजनाओं, वित्तीय अनुमानों और अधिक के लिए उपयोग के लिए तैयार टेम्प्लेट्स।",
      learningToolsTitle: "इंटरैक्टिव लर्निंग टूल्स",
      learningToolsDescription: "अपने ज्ञान का परीक्षण और निर्माण करने के लिए क्विज, आकलन और इंटरैक्टिव मॉड्यूल।",
      exploreResourcesButton: "संसाधन खोजें",
    }
  };

  // Use the content for current language
  const c = content[language];

  return (
    <main className="flex-1">

      {/* Mentorship Section */}
      <section id="mentorship" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">{c.mentorshipTitle}</h2>
            <p className="text-lg text-gray-600">
              {c.mentorshipDescription}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <Users className="h-10 w-10 text-secondary" />
                <CardTitle className="mt-4">{c.mentorCardTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-600">
                  {c.mentorCardDescription}
                </p>
                <Link to="/mentorship/find-mentor">
                  <Button className="w-full bg-primary text-white hover:bg-primary/90">{c.findMentorButton}</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <Calendar className="h-10 w-10 text-secondary" />
                <CardTitle className="mt-4">{c.workshopCardTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-600">
                  {c.workshopCardDescription}
                </p>
                <Link to="/mentorship/workshops">
                  <Button className="w-full bg-primary text-white hover:bg-primary/90">{c.workshopsButton}</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <Lightbulb className="h-10 w-10 text-secondary" />
                <CardTitle className="mt-4">{c.storiesCardTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-600">
                  {c.storiesCardDescription}
                </p>
                <Link to="/mentorship/success-stories">
                  <Button className="w-full bg-primary text-white hover:bg-primary/90">{c.storiesButton}</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* Community Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">{c.communityTitle}</h2>
            <p className="text-lg text-gray-600">
              {c.communityDescription}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Discussion Forums */}
            <Card>
              <CardHeader className="pb-2">
                <MessageSquare className="h-10 w-10 text-secondary" />
                <CardTitle className="mt-4">{c.forumsCardTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-gray-600">
                  {c.forumsCardDescription}
                </p>
                <div className="space-y-4">
                  <div className="rounded-md bg-gray-50 p-4">
                    <h4 className="font-medium text-gray-900">{c.businessStrategyTitle}</h4>
                    <p className="text-sm text-gray-600">
                      {c.businessStrategyDescription}
                    </p>
                  </div>
                  <div className="rounded-md bg-gray-50 p-4">
                    <h4 className="font-medium text-gray-900">{c.financialManagementTitle}</h4>
                    <p className="text-sm text-gray-600">
                      {c.financialManagementDescription}
                    </p>
                  </div>
                  <div className="rounded-md bg-gray-50 p-4">
                    <h4 className="font-medium text-gray-900">{c.marketingTitle}</h4>
                    <p className="text-sm text-gray-600">
                      {c.marketingDescription}
                    </p>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-800">{c.joinForumTitle}</h3>
                  <p className="text-gray-600 mt-2">
                    {c.joinForumDescription}
                  </p>
                  <Link to="/community-forum">
                    <Button className="mt-4 w-full bg-primary text-white hover:bg-primary/90">{c.joinForumButton}</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Resource Library */}
            <Card>
              <CardHeader className="pb-2">
                <BookOpen className="h-10 w-10 text-secondary" />
                <CardTitle className="mt-4">{c.resourcesCardTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-gray-600">
                  {c.resourcesCardDescription}
                </p>
                <div className="space-y-4">
                  <div className="rounded-md bg-gray-50 p-4">
                    <h4 className="font-medium text-gray-900">{c.caseStudiesTitle}</h4>
                    <p className="text-sm text-gray-600">
                      {c.caseStudiesDescription}
                    </p>
                  </div>
                  <div className="rounded-md bg-gray-50 p-4">
                    <h4 className="font-medium text-gray-900">{c.templatesTitle}</h4>
                    <p className="text-sm text-gray-600">
                      {c.templatesDescription}
                    </p>
                  </div>
                  <div className="rounded-md bg-gray-50 p-4">
                    <h4 className="font-medium text-gray-900">{c.learningToolsTitle}</h4>
                    <p className="text-sm text-gray-600">
                      {c.learningToolsDescription}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <Link to="/community/resources">
                    <Button className="w-full bg-primary text-white hover:bg-primary/90">{c.exploreResourcesButton}</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </main>
  )
}