"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageIcon, TrendingUp, DollarSign, Activity, Download, Calendar, BarChart3 } from "lucide-react"
import Link from "next/link"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart as RePieChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState("30d")
  const [activeTab, setActiveTab] = useState("activity")

  // Mock data for activity report
  const activityData = [
    { month: "Jan", images: 45, versions: 120, filters: 89 },
    { month: "Feb", images: 52, versions: 145, filters: 103 },
    { month: "Mar", images: 48, versions: 132, filters: 95 },
    { month: "Apr", images: 61, versions: 168, filters: 124 },
    { month: "May", images: 55, versions: 151, filters: 112 },
    { month: "Jun", images: 67, versions: 189, filters: 142 },
  ]

  // Mock data for payment summary
  const paymentData = [
    { month: "Jan", amount: 4.99, status: "paid" },
    { month: "Feb", amount: 4.99, status: "paid" },
    { month: "Mar", amount: 4.99, status: "paid" },
    { month: "Apr", amount: 9.99, status: "paid" },
    { month: "May", amount: 9.99, status: "paid" },
    { month: "Jun", amount: 9.99, status: "paid" },
  ]

  // Mock data for usage breakdown
  const usageBreakdown = [
    { name: "Images Edited", value: 328, color: "hsl(var(--chart-1))" },
    { name: "Versions Created", value: 905, color: "hsl(var(--chart-2))" },
    { name: "Filters Applied", value: 665, color: "hsl(var(--chart-3))" },
  ]

  // Mock data for filter usage
  const filterUsage = [
    { name: "Grayscale", count: 245 },
    { name: "Contrast", count: 198 },
    { name: "Sepia", count: 142 },
    { name: "Blur", count: 80 },
  ]

  // Mock data for storage trend
  const storageTrend = [
    { month: "Jan", storage: 156 },
    { month: "Feb", storage: 234 },
    { month: "Mar", storage: 312 },
    { month: "Apr", storage: 389 },
    { month: "May", storage: 421 },
    { month: "Jun", storage: 456 },
  ]

  const totalSpent = paymentData.reduce((sum, item) => sum + item.amount, 0)
  const avgMonthlySpend = totalSpent / paymentData.length

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
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/#pricing">Upgrade</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Reports & Analytics</h1>
            <p className="text-muted-foreground">Track your usage, activity, and spending patterns</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px] bg-card border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total Images</span>
              <ImageIcon className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-bold text-card-foreground mb-1">328</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">+12%</span> from last period
            </p>
          </Card>

          <Card className="bg-card border-border p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Versions Created</span>
              <Activity className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-bold text-card-foreground mb-1">905</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">+8%</span> from last period
            </p>
          </Card>

          <Card className="bg-card border-border p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total Spent</span>
              <DollarSign className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-bold text-card-foreground mb-1">${totalSpent.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Last 6 months</p>
          </Card>

          <Card className="bg-card border-border p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Avg Monthly</span>
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-bold text-card-foreground mb-1">${avgMonthlySpend.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Per month</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="activity">
              <Activity className="w-4 h-4 mr-2" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="payments">
              <DollarSign className="w-4 h-4 mr-2" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="usage">
              <BarChart3 className="w-4 h-4 mr-2" />
              Usage
            </TabsTrigger>
          </TabsList>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Activity Trend */}
              <Card className="bg-card border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-card-foreground">Activity Trend</h3>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Last 6 months
                  </Badge>
                </div>
                <ChartContainer
                  config={{
                    images: {
                      label: "Images",
                      color: "hsl(var(--chart-1))",
                    },
                    versions: {
                      label: "Versions",
                      color: "hsl(var(--chart-2))",
                    },
                    filters: {
                      label: "Filters",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="images" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                      <Line type="monotone" dataKey="versions" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                      <Line type="monotone" dataKey="filters" stroke="hsl(var(--chart-3))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </Card>

              {/* Filter Usage */}
              <Card className="bg-card border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-card-foreground">Filter Usage</h3>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Total: {filterUsage.reduce((sum, f) => sum + f.count, 0)}
                  </Badge>
                </div>
                <ChartContainer
                  config={{
                    count: {
                      label: "Count",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={filterUsage}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </Card>
            </div>

            {/* Activity Details */}
            <Card className="bg-card border-border p-6">
              <h3 className="text-lg font-semibold mb-6 text-card-foreground">Monthly Breakdown</h3>
              <div className="space-y-4">
                {activityData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-card-foreground">{item.month} 2025</p>
                        <p className="text-xs text-muted-foreground">Monthly activity summary</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8 text-sm">
                      <div className="text-right">
                        <p className="text-muted-foreground">Images</p>
                        <p className="font-medium text-card-foreground">{item.images}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-muted-foreground">Versions</p>
                        <p className="font-medium text-card-foreground">{item.versions}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-muted-foreground">Filters</p>
                        <p className="font-medium text-card-foreground">{item.filters}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Payment History Chart */}
              <Card className="bg-card border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-card-foreground">Payment History</h3>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    ${totalSpent.toFixed(2)} total
                  </Badge>
                </div>
                <ChartContainer
                  config={{
                    amount: {
                      label: "Amount",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={paymentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="amount" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </Card>

              {/* Payment Summary */}
              <Card className="bg-card border-border p-6">
                <h3 className="text-lg font-semibold mb-6 text-card-foreground">Payment Summary</h3>
                <div className="space-y-6">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Total Spent</span>
                      <span className="text-2xl font-bold text-card-foreground">${totalSpent.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Last 6 months</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Average Monthly</span>
                      <span className="text-2xl font-bold text-card-foreground">${avgMonthlySpend.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Per month</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Total Payments</span>
                      <span className="text-2xl font-bold text-card-foreground">{paymentData.length}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Successful transactions</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Payment Details */}
            <Card className="bg-card border-border p-6">
              <h3 className="text-lg font-semibold mb-6 text-card-foreground">Transaction History</h3>
              <div className="space-y-4">
                {paymentData.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-card-foreground">{payment.month} 2025 Payment</p>
                        <p className="text-xs text-muted-foreground">Monthly subscription</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-card-foreground">${payment.amount.toFixed(2)}</p>
                        <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                          {payment.status}
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

          {/* Usage Tab */}
          <TabsContent value="usage" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Usage Breakdown */}
              <Card className="bg-card border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-card-foreground">Usage Breakdown</h3>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    All time
                  </Badge>
                </div>
                <ChartContainer
                  config={{
                    value: {
                      label: "Value",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={usageBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {usageBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </RePieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </Card>

              {/* Storage Trend */}
              <Card className="bg-card border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-card-foreground">Storage Trend</h3>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    456 / 1124 MB
                  </Badge>
                </div>
                <ChartContainer
                  config={{
                    storage: {
                      label: "Storage (MB)",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={storageTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="storage" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </Card>
            </div>

            {/* Usage Stats */}
            <Card className="bg-card border-border p-6">
              <h3 className="text-lg font-semibold mb-6 text-card-foreground">Detailed Usage Statistics</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {usageBreakdown.map((item, index) => (
                  <div key={index} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm font-medium text-card-foreground">{item.name}</span>
                    </div>
                    <p className="text-3xl font-bold text-card-foreground mb-1">{item.value}</p>
                    <p className="text-xs text-muted-foreground">Total count</p>
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
