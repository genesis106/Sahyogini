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
      {/* Hero Section */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="flex flex-col space-y-6">
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Financial Literacy & Mentorship</h1>
              <p className="text-xl text-white/90">
                Access educational resources, connect with mentors, and build the skills you need to succeed as a woman
                entrepreneur.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link to="#resources">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                    Explore Resources
                  </Button>
                </Link>
                <Link to="#mentorship">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-primary"
                  >
                    Find a Mentor
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
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Financial Education</h2>
            <p className="text-lg text-gray-600">
              Build your financial knowledge with our comprehensive resources on budgeting, investments, loans, and tax
              compliance.
            </p>
          </div>

          <Tabs defaultValue="courses" className="mx-auto max-w-4xl">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <BookOpen className="h-6 w-6 text-secondary" />
                    <CardTitle className="mt-2">Business Budgeting Basics</CardTitle>
                    <CardDescription>4 Modules • 2 Hours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600">
                      Learn how to create and manage a business budget, track expenses, and plan for growth.
                    </p>
                    <Link to="/courses/business-budgeting">
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        Start Course
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <BookOpen className="h-6 w-6 text-secondary" />
                    <CardTitle className="mt-2">Understanding Business Loans</CardTitle>
                    <CardDescription>5 Modules • 3 Hours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600">
                      Understand different types of business loans, application processes, and repayment strategies.
                    </p>
                    <Link to="/courses/business-loans">
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        Start Course
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <BookOpen className="h-6 w-6 text-secondary" />
                    <CardTitle className="mt-2">Tax Compliance for Small Businesses</CardTitle>
                    <CardDescription>6 Modules • 4 Hours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600">
                      Learn about tax regulations, filing requirements, and strategies to optimize your tax position.
                    </p>
                    <Link to="/courses/tax-compliance">
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        Start Course
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <BookOpen className="h-6 w-6 text-secondary" />
                    <CardTitle className="mt-2">Financial Planning for Growth</CardTitle>
                    <CardDescription>4 Modules • 2.5 Hours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600">
                      Develop strategies for sustainable business growth, including reinvestment and expansion planning.
                    </p>
                    <Link to="/courses/financial-planning">
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        Start Course
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 text-center">
                <Link to="/courses">
                  <Button className="bg-primary text-white hover:bg-primary/90">
                    View All Courses <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="articles" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <FileText className="h-6 w-6 text-secondary" />
                    <CardTitle className="mt-2">5 Financial Mistakes to Avoid as a New Entrepreneur</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600">
                      Learn about common financial pitfalls and how to avoid them when starting your business.
                    </p>
                    <Link to="/articles/financial-mistakes">
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        Read Article
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <FileText className="h-6 w-6 text-secondary" />
                    <CardTitle className="mt-2">Understanding Cash Flow Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600">
                      A comprehensive guide to managing cash flow effectively in your small business.
                    </p>
                    <Link to="/articles/cash-flow-management">
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        Read Article
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <FileText className="h-6 w-6 text-secondary" />
                    <CardTitle className="mt-2">Guide to Government Schemes for Women Entrepreneurs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600">
                      Explore various government schemes and subsidies available for women entrepreneurs in India.
                    </p>
                    <Link to="/articles/government-schemes">
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        Read Article
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <FileText className="h-6 w-6 text-secondary" />
                    <CardTitle className="mt-2">Building Business Credit: A Step-by-Step Guide</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600">
                      Learn how to establish and build business credit to improve your access to financing.
                    </p>
                    <Link to="/articles/business-credit">
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        Read Article
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 text-center">
                <Link to="/articles">
                  <Button className="bg-primary text-white hover:bg-primary/90">
                    View All Articles <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="videos" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <Video className="h-6 w-6 text-secondary" />
                    <CardTitle className="mt-2">Financial Statements Explained</CardTitle>
                    <CardDescription>15 Minutes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600">
                      A simple explanation of balance sheets, income statements, and cash flow statements.
                    </p>
                    <Link to="/videos/financial-statements">
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        Watch Video
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <Video className="h-6 w-6 text-secondary" />
                    <CardTitle className="mt-2">Pricing Strategies for Small Businesses</CardTitle>
                    <CardDescription>20 Minutes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600">
                      Learn different pricing models and how to determine the right price for your products or services.
                    </p>
                    <Link to="/videos/pricing-strategies">
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        Watch Video
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 text-center">
                <Link to="/videos">
                  <Button className="bg-primary text-white hover:bg-primary/90">
                    View All Videos <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="tools" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <Calculator className="h-6 w-6 text-secondary" />
                    <CardTitle className="mt-2">AI-Powered Loan Calculator</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600">
                      Calculate loan payments, interest rates, and compare different loan options for your business.
                    </p>
                    <Link to="/tools/loan-calculator">
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        Use Tool
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <Calculator className="h-6 w-6 text-secondary" />
                    <CardTitle className="mt-2">Business Budget Template</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600">
                      Download a customizable business budget template to track income, expenses, and cash flow.
                    </p>
                    <Link to="/tools/budget-template">
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        Download Template
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <Calculator className="h-6 w-6 text-secondary" />
                    <CardTitle className="mt-2">Funding Suggestion Tool</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600">
                      Get personalized funding recommendations based on your business type, location, and financial
                      needs.
                    </p>
                    <Link to="/tools/funding-suggestions">
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        Use Tool
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <Calculator className="h-6 w-6 text-secondary" />
                    <CardTitle className="mt-2">Business Risk Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600">
                      Evaluate potential risks in your business and get recommendations for risk mitigation strategies.
                    </p>
                    <Link to="/tools/risk-assessment">
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        Start Assessment
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 text-center">
                <Link to="/tools">
                  <Button className="bg-primary text-white hover:bg-primary/90">
                    View All Tools <ArrowRight className="ml-2 h-4 w-4" />
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
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to Grow Your Business?</h2>
            <p className="mb-8 text-lg text-white/90">
              Join Sahyogini today to access all our financial literacy resources, connect with mentors, and become part
              of our supportive community.
            </p>
            <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Sign Up Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

