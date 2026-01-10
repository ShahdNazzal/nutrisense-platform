"use client"
import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Brain,Apple, Baby, TrendingUp, Heart, Shield, MessageSquare, Activity, Calendar } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

export default function HomePage() {
const supabase = createClient()
const [redirectPath, setRedirectPath] = useState("/auth/register")
const [user, setUser] = useState<User | null>(null)
const router = useRouter()


  useEffect(() => {
    // الحالة الحالية
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    // نسمع لأي تغيير (login / logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])











  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-accent/20 to-background py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl">
              Everything You Need for Wellnes
            </h1>
            <p className="mt-6 text-lg text-muted-foreground text-balance leading-relaxed md:text-xl">
              Comprehensive tools to understand and improve your health naturally
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/register">
                

              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => window.location.href = redirectPath}
              >Start Your Journey
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



      <img
  src="/profile.jpg"
  alt="profile"
  className="w-60 h-60 object-cover rounded-full border-4 border-white-500 shadow-lg"
 />


<div className="mt-3 w-full pl-4">
  <p className="text-sm text-muted-foreground text-left">
    Built by Shahed Nazzal, Nebal Al-Asad, <br />
    Eman Al-Afeef, and Sadeen Dawagreh
  </p>
</div>












      {/* Features Section */}
      <section id="features" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mt-4">Easy Upload</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  Simply photograph your lab results. Our AI extracts and analyzes all values instantly.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mt-4">AI Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  Advanced AI identifies health concerns and provides clear, jargon-free explanations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mt-4">Health Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  Track all your lab results over time and see trends in your health markers.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mt-4">Personalized Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  Get customized diet, exercise, and wellness plans based on your health profile.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Baby className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mt-4">Pregnancy Care</CardTitle>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="leading-relaxed">
                  Specialized nutrition plans for expectant mothers. Track trimester progress, manage dietary needs, and ensure optimal health for you and your baby.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mt-4">Privacy First</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  Your health data stays secure. All analysis runs locally with no external APIs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mt-4">Daily Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  Monitor your habits, symptoms, and progress with intuitive daily logs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mt-4">Smart Reminders</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  Never miss important health activities with personalized scheduling.
                </CardDescription>
              </CardContent>
            </Card>


            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mt-4">Athletes & Fitness</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  Performance-focused nutrition tracking. Monitor macros, optimize recovery, and achieve your athletic goals with data-driven insights.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mt-4">Doctor Communication</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  Secure messaging with certified nutritionists. Get personalized advice, ask questions, and receive
                    professional guidance anytime.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Apple className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mt-4">Meal Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  Custom meal plans tailored to your goals. Track food intake, analyze nutrition, and get personalized
                  recommendations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mt-4">Appointment Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  Easy scheduling with healthcare providers. Book consultations, manage appointments, and never miss a
                  check-up.
                </CardDescription>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

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
      

      {/* Natural Wellness Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-accent/30 via-background to-accent/20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center max-w-7xl mx-auto">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-card shadow-lg border-2 border-primary/10">
              <img
                src="/medicine-bottles-pills-supplements-vitamins.jpg"
                alt="Medicine bottles, pills, supplements and vitamins"
                className="h-full w-full object-cover"
              />
            </div>

            

            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
                Natural Wellness Solutions
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our AI analyzes your lab results and provides personalized lifestyle recommendations focused on natural
                healing through diet, exercise, and stress management—no prescriptions needed.
              </p>
              <div className="flex items-start gap-4 rounded-lg border bg-card p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Holistic Approach</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Focus on lifestyle changes, not medications
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">How It Works</h2>
            <p className="mt-4 text-lg text-muted-foreground text-balance">
              Three simple steps to better health understanding
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
            <Card className="relative overflow-hidden border-2">
              <div className="absolute top-6 left-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-3xl font-bold text-primary">
                1
              </div>
              <CardHeader className="pt-28">
                <div className="aspect-video overflow-hidden rounded-lg bg-muted mb-4">
                  <img
                    src="/person-photographing-medical-lab-results.jpg"
                    alt="Upload medical results"
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardTitle>Upload</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  Take a photo of your medical test results or upload existing images
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2">
              <div className="absolute top-6 left-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-3xl font-bold text-primary">
                2
              </div>
              <CardHeader className="pt-28">
                <div className="aspect-video overflow-hidden rounded-lg bg-muted mb-4">
                  <img
                    src="/medical-data-analytics-dashboard-with-charts.jpg"
                    alt="AI analyzes results"
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardTitle>Analyze</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  Our AI processes your results and identifies potential health concerns
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2">
              <div className="absolute top-6 left-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-3xl font-bold text-primary">
                3
              </div>
              <CardHeader className="pt-28">
                <div className="aspect-video overflow-hidden rounded-lg bg-muted mb-4">
                  <img
                    src="/person-doing-yoga-exercise-wellness.jpg"
                    alt="Improve your health"
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardTitle>Improve</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  Follow personalized nutrition and lifestyle plans to optimize your health
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>





<div className="mt-3 w-full pl-4">
  <p className="text-right text-lg font-semibold relative right-125">
    <span className="text-black text-xl font-bold">"pages containing paid services"</span>
  </p>
</div>



<div className="w-1/2 mx-auto flex justify-center">
  <a
    href="https://v0-fitness-and-doctor-chat.vercel.app/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src="/Screenshot_1.jpg"
      alt="Clickable Screenshot"
      className="w-full h-48 cursor-pointer hover:opacity-80 transition-opacity border-4 border-blue-100 rounded-lg"
    />
  </a>
</div>






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

      <Footer />
    </div>
  )
}