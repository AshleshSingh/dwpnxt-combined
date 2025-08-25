"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { LandscapeStep } from "./landscape-step"
import { useRouter } from "next/navigation"

export interface ToolSelection {
  category: string
  selectedTools: string[]
  customTools: string[]
}

const LANDSCAPE_CATEGORIES = [
  {
    id: "dex",
    name: "Digital Employee Experience (DEX)",
    description: "Tools for monitoring and improving employee digital experience",
    tools: [
      "Microsoft Viva Insights",
      "Nexthink",
      "Lakeside SysTrack",
      "ControlUp",
      "Liquidware Stratusphere",
      "Aternity",
      "Riverbed SteelCentral",
      "Goliath Technologies",
    ],
  },
  {
    id: "itsm",
    name: "IT Service Management (ITSM)",
    description: "Service desk and IT service management platforms",
    tools: [
      "ServiceNow",
      "BMC Remedy",
      "Jira Service Management",
      "Cherwell",
      "Ivanti Service Manager",
      "ManageEngine ServiceDesk Plus",
      "Freshservice",
      "Zendesk",
    ],
  },
  {
    id: "rpa",
    name: "Robotic Process Automation (RPA)",
    description: "Automation platforms for repetitive tasks",
    tools: [
      "UiPath",
      "Blue Prism",
      "Automation Anywhere",
      "Microsoft Power Automate",
      "WorkFusion",
      "Kofax RPA",
      "Pega Platform",
      "Nice RPA",
    ],
  },
  {
    id: "idp",
    name: "Intelligent Document Processing (IDP)",
    description: "Document processing and data extraction tools",
    tools: [
      "ABBYY Vantage",
      "Kofax TotalAgility",
      "Microsoft AI Builder",
      "UiPath Document Understanding",
      "Hyperscience",
      "Rossum",
      "Automation Anywhere IQ Bot",
      "WorkFusion AutoML",
    ],
  },
  {
    id: "collaboration",
    name: "Collaboration & Communication",
    description: "Team collaboration and communication platforms",
    tools: ["Microsoft Teams", "Slack", "Zoom", "Cisco Webex", "Google Workspace", "Miro", "Notion", "Confluence"],
  },
  {
    id: "aiops",
    name: "AIOps & Monitoring",
    description: "AI-powered operations and infrastructure monitoring",
    tools: ["Splunk", "Dynatrace", "New Relic", "AppDynamics", "Datadog", "PagerDuty", "Moogsoft", "BigPanda"],
  },
  {
    id: "ipaas",
    name: "Integration Platform as a Service (iPaaS)",
    description: "Cloud-based integration and API management platforms",
    tools: [
      "MuleSoft Anypoint",
      "Microsoft Azure Logic Apps",
      "Dell Boomi",
      "Zapier",
      "Workato",
      "Informatica Cloud",
      "SnapLogic",
      "Jitterbit",
    ],
  },
  {
    id: "bi-analytics",
    name: "Business Intelligence & Analytics",
    description: "Data visualization and business intelligence tools",
    tools: [
      "Microsoft Power BI",
      "Tableau",
      "Qlik Sense",
      "Looker",
      "Sisense",
      "IBM Cognos",
      "SAS Visual Analytics",
      "Domo",
    ],
  },
  {
    id: "asset-discovery",
    name: "Asset Discovery & Inventory",
    description: "IT asset management and discovery tools",
    tools: [
      "Lansweeper",
      "ManageEngine AssetExplorer",
      "ServiceNow ITAM",
      "Flexera One",
      "Device42",
      "Qualys VMDR",
      "Rapid7 InsightVM",
      "Tanium",
    ],
  },
  {
    id: "others",
    name: "Other Tools",
    description: "Additional tools not covered in other categories",
    tools: ["Custom In-house Solutions", "Legacy Systems", "Vendor-specific Tools", "Open Source Solutions"],
  },
]

export function LandscapeForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [selections, setSelections] = useState<ToolSelection[]>([])

  // Load saved state from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("dwpnxt-landscape-selections")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setSelections(parsed)
      } catch (error) {
        console.error("Failed to parse saved selections:", error)
      }
    }
  }, [])

  // Save state to localStorage whenever selections change
  useEffect(() => {
    if (selections.length > 0) {
      localStorage.setItem("dwpnxt-landscape-selections", JSON.stringify(selections))
    }
  }, [selections])

  const updateSelection = useCallback((categoryId: string, selectedTools: string[], customTools: string[]) => {
    setSelections((prev) => {
      const existing = prev.find((s) => s.category === categoryId)
      if (existing) {
        return prev.map((s) => (s.category === categoryId ? { ...s, selectedTools, customTools } : s))
      } else {
        return [...prev, { category: categoryId, selectedTools, customTools }]
      }
    })
  }, [])

  const getCurrentSelection = (categoryId: string): ToolSelection | undefined => {
    return selections.find((s) => s.category === categoryId)
  }

  const handleNext = () => {
    if (currentStep < LANDSCAPE_CATEGORIES.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      // Store final selections
      localStorage.setItem("dwpnxt-landscape-final", JSON.stringify(selections))

      // Navigate to upload page
      router.push("/upload")
    } catch (error) {
      console.error("Failed to submit landscape data:", error)
    }
  }

  const progress = ((currentStep + 1) / LANDSCAPE_CATEGORIES.length) * 100
  const currentCategory = LANDSCAPE_CATEGORIES[currentStep]
  const currentSelection = getCurrentSelection(currentCategory.id)

  const handleSelectionChange = useCallback(
    (selectedTools: string[], customTools: string[]) => {
      updateSelection(currentCategory.id, selectedTools, customTools)
    },
    [updateSelection, currentCategory.id],
  )

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card className="border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline">
              Step {currentStep + 1} of {LANDSCAPE_CATEGORIES.length}
            </Badge>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
      </Card>

      {/* Current Step */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-serif text-2xl">{currentCategory.name}</CardTitle>
          <CardDescription className="text-base">{currentCategory.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <LandscapeStep
            category={currentCategory}
            selection={currentSelection}
            onSelectionChange={handleSelectionChange}
          />
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center gap-2 bg-transparent"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {LANDSCAPE_CATEGORIES.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${index <= currentStep ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>

        {currentStep === LANDSCAPE_CATEGORIES.length - 1 ? (
          <Button onClick={handleSubmit} className="flex items-center gap-2">
            Complete Assessment
            <Check className="w-4 h-4" />
          </Button>
        ) : (
          <Button onClick={handleNext} className="flex items-center gap-2">
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Summary */}
      {selections.length > 0 && (
        <Card className="border-border bg-muted/30">
          <CardHeader>
            <CardTitle className="font-serif text-lg">Assessment Summary</CardTitle>
            <CardDescription>
              Categories completed: {selections.length} of {LANDSCAPE_CATEGORIES.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {selections.map((selection) => {
                const category = LANDSCAPE_CATEGORIES.find((c) => c.id === selection.category)
                const totalTools = selection.selectedTools.length + selection.customTools.length
                return (
                  <Badge key={selection.category} variant="secondary" className="justify-center">
                    {category?.name.split(" ")[0]} ({totalTools})
                  </Badge>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
