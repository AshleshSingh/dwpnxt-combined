"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, X } from "lucide-react"
import type { ToolSelection } from "./landscape-form"

interface LandscapeStepProps {
  category: {
    id: string
    name: string
    description: string
    tools: string[]
  }
  selection?: ToolSelection
  onSelectionChange: (selectedTools: string[], customTools: string[]) => void
}

export function LandscapeStep({ category, selection, onSelectionChange }: LandscapeStepProps) {
  const [selectedTools, setSelectedTools] = useState<string[]>(selection?.selectedTools || [])
  const [customTools, setCustomTools] = useState<string[]>(selection?.customTools || [])
  const [newCustomTool, setNewCustomTool] = useState("")

  // Update parent component when selections change
  useEffect(() => {
    onSelectionChange(selectedTools, customTools)
  }, [selectedTools, customTools, onSelectionChange])

  const handleToolToggle = (tool: string) => {
    setSelectedTools((prev) => (prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]))
  }

  const handleAddCustomTool = () => {
    if (newCustomTool.trim() && !customTools.includes(newCustomTool.trim())) {
      setCustomTools((prev) => [...prev, newCustomTool.trim()])
      setNewCustomTool("")
    }
  }

  const handleRemoveCustomTool = (tool: string) => {
    setCustomTools((prev) => prev.filter((t) => t !== tool))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddCustomTool()
    }
  }

  return (
    <div className="space-y-6">
      {/* Market-leading Tools */}
      <div>
        <Label className="text-base font-medium mb-4 block">
          Select tools currently in use (multiple selections allowed):
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {category.tools.map((tool) => (
            <Card
              key={tool}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedTools.includes(tool) ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
              onClick={() => handleToolToggle(tool)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={selectedTools.includes(tool)}
                    onChange={() => handleToolToggle(tool)}
                    className="pointer-events-none"
                  />
                  <span className="text-sm font-medium">{tool}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Custom Tools */}
      <div>
        <Label className="text-base font-medium mb-4 block">Add custom tools not listed above:</Label>

        {/* Add Custom Tool Input */}
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Enter custom tool name..."
            value={newCustomTool}
            onChange={(e) => setNewCustomTool(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleAddCustomTool} disabled={!newCustomTool.trim()} size="icon" variant="outline">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Custom Tools List */}
        {customTools.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Custom tools added:</Label>
            <div className="flex flex-wrap gap-2">
              {customTools.map((tool) => (
                <Badge key={tool} variant="secondary" className="flex items-center gap-2 pr-1">
                  {tool}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => handleRemoveCustomTool(tool)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Selection Summary */}
      {(selectedTools.length > 0 || customTools.length > 0) && (
        <Card className="bg-muted/30 border-border">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground mb-2">Selected for {category.name}:</div>
            <div className="text-sm font-medium">
              {selectedTools.length + customTools.length} tool
              {selectedTools.length + customTools.length !== 1 ? "s" : ""} selected
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
