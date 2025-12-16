"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles, ImageIcon, Zap } from "lucide-react"
import { useUser } from "@/lib/user-context"

export default function HomePage() {
  const { plan, upgradeToPlan } = useUser()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-xl text-foreground">ImagePro</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/editor" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Editor
            </Link>
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
          <Sparkles className="w-3 h-3 mr-1" />
          New: Advanced AI Filters
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
          Professional Image Editing
          <br />
          <span className="text-primary">Made Simple</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
          Transform your images with powerful filters, custom watermarks, and professional-grade editing tools. Choose
          the plan that fits your needs.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/editor">Start Editing Free</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#pricing">View Pricing</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-card-foreground">Instant Filters</h3>
            <p className="text-muted-foreground">
              Apply professional filters with real-time preview. Grayscale, sepia, blur, and more.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <ImageIcon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-card-foreground">Custom Watermarks</h3>
            <p className="text-muted-foreground">
              Protect your work with customizable watermarks. Control position, opacity, and style.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-card-foreground">Version History</h3>
            <p className="text-muted-foreground">
              Never lose your work. Access all versions and edits with complete history tracking.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Pricing</Badge>
          <h2 className="text-4xl font-bold mb-4 text-foreground">Plans and Pricing</h2>
          <p className="text-lg text-muted-foreground">
            Get started immediately for free. Upgrade for more credits, usage and collaboration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Free Plan */}
          <div className="bg-card border border-border rounded-lg p-6 flex flex-col">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">Free</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold text-card-foreground">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-muted-foreground">For people looking to explore.</p>
            </div>
            <ul className="space-y-3 mb-6 flex-grow">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-card-foreground">10 images per month</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-card-foreground">200MB storage</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-card-foreground">Basic filters (grayscale, contrast)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-card-foreground">Version history</span>
              </li>
            </ul>
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => upgradeToPlan("Free")}
              disabled={plan === "Free"}
            >
              {plan === "Free" ? "Current Plan" : "Downgrade to Free"}
            </Button>
          </div>

          {/* Bronze Plan */}
          <div className="bg-card border border-border rounded-lg p-6 flex flex-col">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">Bronze</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold text-card-foreground">$5</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-muted-foreground">For higher limits and power users.</p>
            </div>
            <ul className="space-y-3 mb-6 flex-grow">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-card-foreground">100 images per month</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-card-foreground">1GB storage</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-card-foreground">Bronze filters (sepia, brightness, vintage)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-card-foreground">Custom watermarks</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-card-foreground">Priority support</span>
              </li>
            </ul>
            <Button className="w-full" onClick={() => upgradeToPlan("Bronze")} disabled={plan === "Bronze"}>
              {plan === "Bronze" ? "Current Plan" : "Upgrade to Bronze"}
            </Button>
          </div>

          {/* Silver Plan */}
          <div className="bg-card border border-border rounded-lg p-6 flex flex-col">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">Silver</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold text-card-foreground">$10</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-muted-foreground">For professionals and creators.</p>
            </div>
            <ul className="space-y-3 mb-6 flex-grow">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-card-foreground">500 images per month</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-card-foreground">4GB storage</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-card-foreground">Silver filters (duotone, vignette, sharpen)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-card-foreground">Advanced watermark presets</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-card-foreground">Batch processing</span>
              </li>
            </ul>
            <Button className="w-full" onClick={() => upgradeToPlan("Silver")} disabled={plan === "Silver"}>
              {plan === "Silver" ? "Current Plan" : "Upgrade to Silver"}
            </Button>
          </div>

          {/* Gold Plan */}
          <div className="bg-card border-2 border-primary rounded-lg p-6 flex flex-col relative">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
              Recommended
            </Badge>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">Gold</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold text-card-foreground">$20</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-muted-foreground">For teams and businesses.</p>
            </div>
            <ul className="space-y-3 mb-6 flex-grow">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-card-foreground">Unlimited images</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-card-foreground">16GB storage</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-card-foreground">Gold filters (background blur, HDR, AI enhance)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-card-foreground">Unlimited watermark presets</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-card-foreground">API access</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-card-foreground">Dedicated support</span>
              </li>
            </ul>
            <Button className="w-full" onClick={() => upgradeToPlan("Gold")} disabled={plan === "Gold"}>
              {plan === "Gold" ? "Current Plan" : "Upgrade to Gold"}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <ImageIcon className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">ImagePro</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 ImagePro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
