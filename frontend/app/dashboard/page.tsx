"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Tooltip,
  Legend,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle2,
  Brain,
  Zap,
  BarChart3,
  Activity,
} from "lucide-react"
import Link from "next/link"

// Mock data for dashboard
const ticketVolumeData = [
  { month: "Jan", tickets: 245, resolved: 220, pending: 25 },
  { month: "Feb", tickets: 289, resolved: 265, pending: 24 },
  { month: "Mar", tickets: 312, resolved: 290, pending: 22 },
  { month: "Apr", tickets: 278, resolved: 260, pending: 18 },
  { month: "May", tickets: 334, resolved: 315, pending: 19 },
  { month: "Jun", tickets: 298, resolved: 285, pending: 13 },
]

const categoryData = [
  { category: "Network Issues", count: 156, percentage: 35, color: "#10b981" },
  { category: "Software Bugs", count: 89, percentage: 20, color: "#3b82f6" },
  { category: "User Access", count: 78, percentage: 18, color: "#8b5cf6" },
  { category: "Hardware", count: 67, percentage: 15, color: "#f59e0b" },
  { category: "Security", count: 34, percentage: 8, color: "#ef4444" },
  { category: "Other", count: 22, percentage: 4, color: "#6b7280" },
]

const resolutionTimeData = [
  { priority: "Critical", avgTime: 2.5, target: 4, tickets: 23 },
  { priority: "High", avgTime: 8.2, target: 12, tickets: 89 },
  { priority: "Medium", avgTime: 24.1, target: 48, tickets: 234 },
  { priority: "Low", avgTime: 72.3, target: 120, tickets: 156 },
]

const automationOpportunities = [
  { task: "Password Resets", current: 145, potential: 130, savings: "90%" },
  { task: "User Access Requests", current: 89, potential: 80, savings: "90%" },
  { task: "Software Installation", current: 67, potential: 45, savings: "67%" },
  { task: "Network Diagnostics", current: 45, potential: 30, savings: "67%" },
  { task: "System Monitoring", current: 34, potential: 28, savings: "82%" },
]

const trendData = [
  { week: "W1", incidents: 45, resolved: 42, satisfaction: 4.2 },
  { week: "W2", incidents: 52, resolved: 48, satisfaction: 4.1 },
  { week: "W3", incidents: 38, resolved: 36, satisfaction: 4.4 },
  { week: "W4", incidents: 61, resolved: 58, satisfaction: 4.0 },
  { week: "W5", incidents: 43, resolved: 41, satisfaction: 4.3 },
  { week: "W6", incidents: 49, resolved: 47, satisfaction: 4.2 },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2 font-serif">IT Service Analytics Dashboard</h1>
            <p className="text-xl text-slate-600">Comprehensive insights and automation opportunities</p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline">
              <Link href="/upload">Upload New Data</Link>
            </Button>
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/landscape">Update Landscape</Link>
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Tickets</p>
                  <p className="text-3xl font-bold text-slate-900">1,847</p>
                  <p className="text-sm text-emerald-600 flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +12% from last month
                  </p>
                </div>
                <BarChart3 className="h-12 w-12 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Avg Resolution</p>
                  <p className="text-3xl font-bold text-slate-900">18.5h</p>
                  <p className="text-sm text-emerald-600 flex items-center mt-1">
                    <TrendingDown className="h-4 w-4 mr-1" />
                    -8% improvement
                  </p>
                </div>
                <Clock className="h-12 w-12 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Satisfaction</p>
                  <p className="text-3xl font-bold text-slate-900">4.2/5</p>
                  <p className="text-sm text-emerald-600 flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +0.3 points
                  </p>
                </div>
                <Users className="h-12 w-12 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Automation Potential</p>
                  <p className="text-3xl font-bold text-slate-900">67%</p>
                  <p className="text-sm text-orange-600 flex items-center mt-1">
                    <Zap className="h-4 w-4 mr-1" />
                    High opportunity
                  </p>
                </div>
                <Brain className="h-12 w-12 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-serif">Ticket Volume Trends</CardTitle>
                  <CardDescription>Monthly ticket volume and resolution rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={ticketVolumeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="tickets"
                          stackId="1"
                          stroke="#10b981"
                          fill="#10b981"
                          fillOpacity={0.6}
                          name="Total Tickets"
                        />
                        <Area
                          type="monotone"
                          dataKey="resolved"
                          stackId="2"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          fillOpacity={0.6}
                          name="Resolved"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-serif">Weekly Performance</CardTitle>
                  <CardDescription>Incident trends and satisfaction scores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="incidents" stroke="#ef4444" strokeWidth={2} name="Incidents" />
                        <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} name="Resolved" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-serif">Ticket Categories</CardTitle>
                  <CardDescription>Distribution of tickets by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={categoryData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="count">
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload
                              return (
                                <div className="bg-white p-3 border rounded-lg shadow-lg">
                                  <p className="font-medium">{data.category}</p>
                                  <p className="text-sm text-slate-600">
                                    {data.count} tickets ({data.percentage}%)
                                  </p>
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-serif">Category Breakdown</CardTitle>
                  <CardDescription>Detailed view of ticket categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categoryData.map((category, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                          <span className="font-medium text-slate-900">{category.category}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge variant="secondary">{category.count} tickets</Badge>
                          <span className="text-sm font-medium text-slate-600">{category.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-serif">Resolution Time Analysis</CardTitle>
                <CardDescription>Average resolution times by priority level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={resolutionTimeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="priority" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="avgTime" fill="#3b82f6" name="Avg Time (hours)" />
                      <Bar dataKey="target" fill="#10b981" name="Target (hours)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {resolutionTimeData.map((item, index) => (
                <Card key={index} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Badge variant={item.priority === "Critical" ? "destructive" : "secondary"} className="mb-2">
                        {item.priority}
                      </Badge>
                      <p className="text-2xl font-bold text-slate-900">{item.avgTime}h</p>
                      <p className="text-sm text-slate-600">Target: {item.target}h</p>
                      <p className="text-xs text-slate-500 mt-1">{item.tickets} tickets</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="automation" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-serif flex items-center gap-2">
                  <Zap className="h-5 w-5 text-orange-600" />
                  Automation Opportunities
                </CardTitle>
                <CardDescription>Tasks with high automation potential and estimated savings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {automationOpportunities.map((opportunity, index) => (
                    <div key={index} className="p-4 bg-gradient-to-r from-orange-50 to-emerald-50 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-slate-900">{opportunity.task}</h4>
                        <Badge className="bg-orange-100 text-orange-800">{opportunity.savings} savings</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-slate-600">Current Volume</p>
                          <p className="font-medium text-slate-900">{opportunity.current} tickets/month</p>
                        </div>
                        <div>
                          <p className="text-slate-600">Automation Potential</p>
                          <p className="font-medium text-emerald-600">{opportunity.potential} tickets/month</p>
                        </div>
                        <div>
                          <p className="text-slate-600">Time Savings</p>
                          <p className="font-medium text-orange-600">
                            {Math.round((opportunity.potential / opportunity.current) * 40)} hours/month
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6 text-center">
                  <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                  <p className="text-2xl font-bold text-slate-900">380</p>
                  <p className="text-sm text-slate-600">Tasks Ready for Automation</p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6 text-center">
                  <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <p className="text-2xl font-bold text-slate-900">156h</p>
                  <p className="text-sm text-slate-600">Monthly Time Savings Potential</p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6 text-center">
                  <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <p className="text-2xl font-bold text-slate-900">$45K</p>
                  <p className="text-sm text-slate-600">Estimated Annual Savings</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* AI Insights Section */}
        <Card className="shadow-lg border-0 bg-gradient-to-r from-emerald-50 to-blue-50 mt-8">
          <CardHeader>
            <CardTitle className="font-serif flex items-center gap-2">
              <Brain className="h-6 w-6 text-emerald-600" />
              AI-Powered Insights & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Key Findings</h4>
                <ul className="space-y-2">
                  <li className="flex items-start text-sm text-slate-700">
                    <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                    Network issues show 40% increase during peak hours (9-11 AM)
                  </li>
                  <li className="flex items-start text-sm text-slate-700">
                    <TrendingUp className="h-4 w-4 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                    User satisfaction improved 15% after implementing self-service portal
                  </li>
                  <li className="flex items-start text-sm text-slate-700">
                    <Activity className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    67% of password reset requests can be fully automated
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Recommended Actions</h4>
                <ul className="space-y-2">
                  <li className="flex items-start text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                    Deploy proactive network monitoring during peak hours
                  </li>
                  <li className="flex items-start text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                    Implement chatbot for Level 1 support inquiries
                  </li>
                  <li className="flex items-start text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                    Create automated workflows for routine access requests
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
