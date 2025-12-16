"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ImageIcon,
  CreditCard,
  Package,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const subscription = {
    plan: "Bronze",
    status: "active",
    price: 4.99,
    period: "monthly",
    currentPeriodStart: "2025-01-01",
    currentPeriodEnd: "2025-02-01",
    nextBillingDate: "2025-02-01",
  }

  const purchases = [
    {
      id: 1,
      product: "Bronze Plan",
      type: "plan",
      amount: 4.99,
      status: "paid",
      date: "2025-01-01",
    },
    {
      id: 2,
      product: "Extra Storage (100MB)",
      type: "add_on",
      amount: 2.99,
      status: "paid",
      date: "2024-12-15",
    },
    {
      id: 3,
      product: "Free Plan",
      type: "plan",
      amount: 0.0,
      status: "paid",
      date: "2024-12-01",
    },
  ]

  const entitlements = [
    {
      id: 1,
      feature: "Monthly Image Quota",
      value: "100 images",
      effectiveFrom: "2025-01-01",
      effectiveTo: "2025-02-01",
    },
    {
      id: 2,
      feature: "Storage Limit",
      value: "1GB + 100MB bonus",
      effectiveFrom: "2024-12-15",
      effectiveTo: null,
    },
    {
      id: 3,
      feature: "Premium Filters",
      value: "Sepia, Blur",
      effectiveFrom: "2025-01-01",
      effectiveTo: "2025-02-01",
    },
    {
      id: 4,
      feature: "Watermark Access",
      value: "Enabled",
      effectiveFrom: "2025-01-01",
      effectiveTo: "2025-02-01",
    },
  ]

  const recentImages = [
    { id: 1, name: "landscape.jpg", versions: 3, size: "2.4 MB", date: "2025-01-07" },
    { id: 2, name: "portrait.png", versions: 2, size: "1.8 MB", date: "2025-01-06" },
    { id: 3, name: "product.jpg", versions: 5, size: "3.1 MB", date: "2025-01-05" },
  ]

  const usage = {
    imagesThisMonth: 23,
    imagesQuota: 100,
    storageUsed: 456,
    storageLimit: 1124,
    versionsCreated: 67,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-xl text-foreground">ImagePro</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/editor">Editor</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/reports">Reports</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/#pricing">Upgrade</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage your subscription, purchases, and usage</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Images This Month</span>
              <ImageIcon className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-bold text-card-foreground">
              {usage.imagesThisMonth} / {usage.imagesQuota}
            </div>
            <div className="w-full bg-muted rounded-full h-1.5 mt-3">
              <div
                className="bg-primary h-1.5 rounded-full"
                style={{ width: `${(usage.imagesThisMonth / usage.imagesQuota) * 100}%` }}
              ></div>
            </div>
          </Card>

          <Card className="bg-card border-border p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Storage Used</span>
              <Package className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-bold text-card-foreground">
              {usage.storageUsed} / {usage.storageLimit} MB
            </div>
            <div className="w-full bg-muted rounded-full h-1.5 mt-3">
              <div
                className="bg-primary h-1.5 rounded-full"
                style={{ width: `${(usage.storageUsed / usage.storageLimit) * 100}%` }}
              ></div>
            </div>
          </Card>

          <Card className="bg-card border-border p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Versions Created</span>
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-bold text-card-foreground">{usage.versionsCreated}</div>
            <p className="text-xs text-muted-foreground mt-2">All time</p>
          </Card>

          <Card className="bg-card border-border p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Current Plan</span>
              <CreditCard className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-bold text-card-foreground">{subscription.plan}</div>
            <Badge variant="secondary" className="mt-2 bg-primary/10 text-primary">
              {subscription.status}
            </Badge>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="purchases">Purchases</TabsTrigger>
            <TabsTrigger value="entitlements">Entitlements</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Current Subscription */}
              <Card className="bg-card border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-card-foreground">Current Subscription</h3>
                  <Badge className="bg-primary/10 text-primary border-primary/20">{subscription.status}</Badge>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Plan</span>
                    <span className="text-sm font-medium text-card-foreground">{subscription.plan}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Price</span>
                    <span className="text-sm font-medium text-card-foreground">
                      ${subscription.price}/{subscription.period}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Next Billing</span>
                    <span className="text-sm font-medium text-card-foreground">{subscription.nextBillingDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Period</span>
                    <span className="text-sm font-medium text-card-foreground">
                      {subscription.currentPeriodStart} - {subscription.currentPeriodEnd}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-6">
                  <Button className="flex-1" asChild>
                    <Link href="/#pricing">Upgrade Plan</Link>
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Manage
                  </Button>
                </div>
              </Card>

              {/* Recent Images */}
              <Card className="bg-card border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-card-foreground">Recent Images</h3>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/editor">
                      View All
                      <ExternalLink className="w-3 h-3 ml-2" />
                    </Link>
                  </Button>
                </div>
                <div className="space-y-4">
                  {recentImages.map((image) => (
                    <div key={image.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-muted rounded-lg"></div>
                        <div>
                          <p className="text-sm font-medium text-card-foreground">{image.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {image.versions} versions • {image.size}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Active Entitlements */}
            <Card className="bg-card border-border p-6">
              <h3 className="text-lg font-semibold mb-6 text-card-foreground">Active Entitlements</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {entitlements.slice(0, 4).map((entitlement) => (
                  <div key={entitlement.id} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-card-foreground mb-1">{entitlement.feature}</p>
                      <p className="text-xs text-muted-foreground mb-2">{entitlement.value}</p>
                      <p className="text-xs text-muted-foreground">
                        {entitlement.effectiveTo ? `Until ${entitlement.effectiveTo}` : "Permanent"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription" className="space-y-6">
            <Card className="bg-card border-border p-6">
              <h3 className="text-lg font-semibold mb-6 text-card-foreground">Subscription Details</h3>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Plan Name</label>
                    <p className="text-base font-medium text-card-foreground">{subscription.plan}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Status</label>
                    <Badge className="bg-primary/10 text-primary border-primary/20">{subscription.status}</Badge>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Billing Amount</label>
                    <p className="text-base font-medium text-card-foreground">
                      ${subscription.price} / {subscription.period}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Next Billing Date</label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <p className="text-base font-medium text-card-foreground">{subscription.nextBillingDate}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Current Period Start</label>
                    <p className="text-base font-medium text-card-foreground">{subscription.currentPeriodStart}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Current Period End</label>
                    <p className="text-base font-medium text-card-foreground">{subscription.currentPeriodEnd}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-border flex gap-3">
                  <Button asChild>
                    <Link href="/#pricing">Change Plan</Link>
                  </Button>
                  <Button variant="outline">Update Payment Method</Button>
                  <Button variant="outline" className="text-destructive bg-transparent">
                    Cancel Subscription
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Purchases Tab */}
          <TabsContent value="purchases" className="space-y-6">
            <Card className="bg-card border-border p-6">
              <h3 className="text-lg font-semibold mb-6 text-card-foreground">Purchase History</h3>
              <div className="space-y-4">
                {purchases.map((purchase) => (
                  <div key={purchase.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        {purchase.type === "plan" ? (
                          <CreditCard className="w-5 h-5 text-primary" />
                        ) : (
                          <Package className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-card-foreground">{purchase.product}</p>
                        <p className="text-xs text-muted-foreground">{purchase.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-card-foreground">${purchase.amount.toFixed(2)}</p>
                        <Badge
                          variant="secondary"
                          className={
                            purchase.status === "paid" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                          }
                        >
                          {purchase.status}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Entitlements Tab */}
          <TabsContent value="entitlements" className="space-y-6">
            <Card className="bg-card border-border p-6">
              <h3 className="text-lg font-semibold mb-6 text-card-foreground">Your Entitlements</h3>
              <p className="text-sm text-muted-foreground mb-6">
                These are the features and quotas you currently have access to based on your subscription and purchases.
              </p>
              <div className="space-y-4">
                {entitlements.map((entitlement) => (
                  <div key={entitlement.id} className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-card-foreground mb-1">{entitlement.feature}</p>
                        <p className="text-sm text-muted-foreground mb-2">{entitlement.value}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            From {entitlement.effectiveFrom}
                          </span>
                          {entitlement.effectiveTo && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Until {entitlement.effectiveTo}
                            </span>
                          )}
                          {!entitlement.effectiveTo && (
                            <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                              Permanent
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
