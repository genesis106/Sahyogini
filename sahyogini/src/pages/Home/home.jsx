import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, BookOpen, CreditCard, HandHeart, LineChart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="flex flex-col space-y-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                Empowering <span className="text-primary">Women</span> Entrepreneurs
              </h1>
              <p className="text-xl text-gray-600">
                Sahyogini connects women entrepreneurs with investors and provides financial insights, funding
                opportunities, and business growth tools.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link to="/signup">
                  <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                    Get Started
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] w-full rounded-lg shadow-xl">
              <img
                src="/women1.jpg"
                alt="Women entrepreneurs"
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Key Features</h2>
            <p className="text-lg text-gray-600">
              Sahyogini provides a comprehensive platform for both investors and women entrepreneurs.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <BarChart3 className="h-10 w-10 text-secondary" />, title: "Investor Dashboard", description: "Track your investments, monitor portfolio performance, and access reports on funded businesses." },
              { icon: <LineChart className="h-10 w-10 text-secondary" />, title: "Business Dashboard", description: "Apply for funding, track revenue, and receive AI-driven financial insights to grow your business." },
              { icon: <CreditCard className="h-10 w-10 text-secondary" />, title: "Alternative Financing", description: "Access revenue-based financing, P2P lending, crowdfunding, and microfinance options tailored to your needs." },
              { icon: <BookOpen className="h-10 w-10 text-secondary" />, title: "Financial Literacy", description: "Learn about budgeting, investments, loans, and tax compliance through our educational resources." },
              { icon: <Users className="h-10 w-10 text-secondary" />, title: "Mentorship", description: "Connect with experienced mentors, attend workshops, and learn from success stories of other entrepreneurs." },
              { icon: <HandHeart className="h-10 w-10 text-secondary" />, title: "Community Support", description: "Join our community of women entrepreneurs, share experiences, and grow together through mutual support." },
            ].map((feature, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">{feature.icon}<CardTitle className="mt-4">{feature.title}</CardTitle></CardHeader>
                <CardContent><CardDescription className="text-base">{feature.description}</CardDescription></CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to Start Your Journey?</h2>
          <p className="mb-8 text-lg text-white/90">
            Join Sahyogini today and connect with investors, access funding, and grow your business with our support.
          </p>
          <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">Sign Up Now</Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
