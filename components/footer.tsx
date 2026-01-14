import Link from "next/link"
import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary fill-primary" />
              <span className="font-bold text-lg">NutriSense</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered nutrition and health analysis platform for optimal wellness.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#features" className="text-muted-foreground hover:text-primary transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/pregnancy/setup" className="text-muted-foreground hover:text-primary transition-colors">
                  Pregnancy Care
                </Link>
              </li>
              <li>
                <Link href="https://fitnessandhatting.vercel.app/nutrisense-fitness" className="text-muted-foreground hover:text-primary transition-colors">
                  Athletes & Fitness
                </Link>
              </li>
              <li>
                <Link href="https://fitnessandhatting.vercel.app/chat" className="text-muted-foreground hover:text-primary transition-colors">
                  Doctor Chat
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/auth/register" className="text-muted-foreground hover:text-primary transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="text-muted-foreground hover:text-primary transition-colors">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} NutriSense. All rights reserved.</p>
        </div>

        <p className="text-sm text-muted-foreground , text-center mt-4">
          Built by: Shahed Nazzal & Nebal Al-Asad & Eman Al-Afeef & Sadeen Dawaghreh</p>
        

       <p className="text-sm text-muted-foreground leading-relaxed">
  NutriSense uses trusted medical datasets from verified sources such as PhysioNet.
  All user data and chat communications are securely stored and accessed only by authorized doctors.
  Patient messages are strictly private and never visible to other users.
  Developed by a student-led team based in Jordan.
</p>

<p className="mt-2 text-yellow-400 text-sm font-medium flex items-center gap-1">
    ⚠️ You may be required to pay inside Fitness&Chat page
  </p>







<p className="text-sm mt-2">
  Data Source:{" "}
  <a
    href="https://physionet.org/"
    target="_blank"
    className="underline"
  >
    https://physionet.org/
  </a>
  <br />
  Contact: Gmail:{" "}
  <a
    href="mailto:nutrisense.2025@gmail.com"
    className="underline"
  >
    NutriSense.2025@gmail.com
  </a>
  <br />
  Instagram:{" "}
  <a
    href="https://www.instagram.com/nutrisense_jo/"
    className="underline"
    target="_blank"
    rel="noopener noreferrer"
  >
    nutrisense_jo
  </a>
</p>





      </div>
    </footer>
    
  )
  
}
