import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Activity, Apple, Baby, MessageSquare, Calendar, TrendingUp } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">NutriSense</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="#doctors" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Our Doctors
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Professional Health & Nutrition Platform
            </h1>
            <p className="mt-6 text-pretty text-lg text-muted-foreground leading-relaxed">
              Comprehensive nutrition management for pregnancy care, athletic performance, and personalized medical
              guidance. Connect with certified nutritionists and track your health journey with precision.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Your Journey
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">10K+</div>
              <div className="mt-2 text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="mt-2 text-sm text-muted-foreground">Certified Doctors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">95%</div>
              <div className="mt-2 text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="mt-2 text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Comprehensive Health Solutions</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to manage your nutrition and health in one platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-primary/10 p-3 mb-4">
                    <Baby className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Pregnancy Care</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Specialized nutrition plans for expectant mothers. Track trimester progress, manage dietary needs,
                    and ensure optimal health for you and your baby.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-accent/10 p-3 mb-4">
                    <TrendingUp className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Athletes & Fitness</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Performance-focused nutrition tracking. Monitor macros, optimize recovery, and achieve your athletic
                    goals with data-driven insights.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-secondary/10 p-3 mb-4">
                    <MessageSquare className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Doctor Communication</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Secure messaging with certified nutritionists. Get personalized advice, ask questions, and receive
                    professional guidance anytime.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-chart-3/10 p-3 mb-4">
                    <Apple className="h-6 w-6 text-chart-3" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Meal Planning</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Custom meal plans tailored to your goals. Track food intake, analyze nutrition, and get personalized
                    recommendations.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-chart-4/10 p-3 mb-4">
                    <Calendar className="h-6 w-6 text-chart-4" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Appointment Booking</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Easy scheduling with healthcare providers. Book consultations, manage appointments, and never miss a
                    check-up.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-chart-5/10 p-3 mb-4">
                    <Activity className="h-6 w-6 text-chart-5" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Health Tracking</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Monitor BMI, weight, blood pressure, and more. Visualize your health trends with comprehensive
                    analytics and reports.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Health?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of users who trust NutriSense for their nutrition and health management
          </p>
          <Link href="/auth/register">
            <Button size="lg" variant="secondary">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Activity className="h-5 w-5 text-primary" />
                <span className="font-semibold">NutriSense</span>
              </div>
              <p className="text-sm text-muted-foreground">Professional health and nutrition management platform.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 NutriSense. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
