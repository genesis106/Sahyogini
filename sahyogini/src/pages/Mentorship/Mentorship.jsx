import { Link } from "react-router-dom";
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
  return (
    <main className="flex-1">

      {/* Mentorship Section */}
      <section id="mentorship" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Mentorship & Networking</h2>
            <p className="text-lg text-gray-600">
              Connect with experienced mentors, attend workshops, and learn from success stories of other entrepreneurs.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <Users className="h-10 w-10 text-secondary" />
                <CardTitle className="mt-4">1-on-1 Mentor Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-600">
                  Get matched with an experienced mentor based on your industry, goals, and challenges. Receive
                  personalized guidance and support.
                </p>
                <Link to="/mentorship/find-mentor">
                  <Button className="w-full bg-primary text-white hover:bg-primary/90">Find a Mentor</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <Calendar className="h-10 w-10 text-secondary" />
                <CardTitle className="mt-4">Live Workshops</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-600">
                  Participate in interactive workshops led by industry experts on various aspects of business and
                  financial management.
                </p>
                <Link to="/mentorship/workshops">
                  <Button className="w-full bg-primary text-white hover:bg-primary/90">Upcoming Workshops</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <Lightbulb className="h-10 w-10 text-secondary" />
                <CardTitle className="mt-4">Success Stories</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-600">
                  Read inspiring stories of women entrepreneurs who have overcome challenges and built successful
                  businesses.
                </p>
                <Link to="/mentorship/success-stories">
                  <Button className="w-full bg-primary text-white hover:bg-primary/90">Read Stories</Button>
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
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Community & Resources</h2>
            <p className="text-lg text-gray-600">
              Join our community of women entrepreneurs, share experiences, and access valuable resources.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Discussion Forums */}
            <Card>
              <CardHeader className="pb-2">
                <MessageSquare className="h-10 w-10 text-secondary" />
                <CardTitle className="mt-4">Discussion Forums</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-gray-600">
                  Connect with other women entrepreneurs, ask questions, share insights, and learn from each other's experiences.
                </p>
                <div className="space-y-4">
                  <div className="rounded-md bg-gray-50 p-4">
                    <h4 className="font-medium text-gray-900">Business Strategy</h4>
                    <p className="text-sm text-gray-600">
                      Discuss business models, growth strategies, and market positioning.
                    </p>
                  </div>
                  <div className="rounded-md bg-gray-50 p-4">
                    <h4 className="font-medium text-gray-900">Financial Management</h4>
                    <p className="text-sm text-gray-600">
                      Share tips on budgeting, accounting, and financial planning.
                    </p>
                  </div>
                  <div className="rounded-md bg-gray-50 p-4">
                    <h4 className="font-medium text-gray-900">Marketing & Sales</h4>
                    <p className="text-sm text-gray-600">
                      Exchange ideas on customer acquisition, branding, and sales strategies.
                    </p>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-800">💬 Join the Discussion Forum!</h3>
                  <p className="text-gray-600 mt-2">
                    Connect with other women entrepreneurs to ask financial questions & share advice.
                  </p>
                  <Link to="/community-forum">
                    <Button className="mt-4 w-full bg-primary text-white hover:bg-primary/90">Join the Discussion</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Resource Library */}
            <Card>
              <CardHeader className="pb-2">
                <BookOpen className="h-10 w-10 text-secondary" />
                <CardTitle className="mt-4">Resource Library</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-gray-600">
                  Access a comprehensive library of resources including case studies, templates, guides, and more.
                </p>
                <div className="space-y-4">
                  <div className="rounded-md bg-gray-50 p-4">
                    <h4 className="font-medium text-gray-900">Case Studies</h4>
                    <p className="text-sm text-gray-600">
                      In-depth analyses of successful women-led businesses across various sectors.
                    </p>
                  </div>
                  <div className="rounded-md bg-gray-50 p-4">
                    <h4 className="font-medium text-gray-900">Business Templates</h4>
                    <p className="text-sm text-gray-600">
                      Ready-to-use templates for business plans, financial projections, and more.
                    </p>
                  </div>
                  <div className="rounded-md bg-gray-50 p-4">
                    <h4 className="font-medium text-gray-900">Interactive Learning Tools</h4>
                    <p className="text-sm text-gray-600">
                      Quizzes, assessments, and interactive modules to test and build your knowledge.
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <Link to="/community/resources">
                    <Button className="w-full bg-primary text-white hover:bg-primary/90">Explore Resources</Button>
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

