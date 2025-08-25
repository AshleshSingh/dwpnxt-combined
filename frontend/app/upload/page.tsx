"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { SampleDataCard } from "@/components/sample-data-card"

interface UploadedFile {
  url: string
  filename: string
  size: number
  type: string
}

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    // Validate file type
    const allowedTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ]

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Please upload a CSV or Excel file (.csv, .xls, .xlsx)")
      return
    }

    // Validate file size (10MB limit)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB")
      return
    }

    setFile(selectedFile)
    setError(null)
    setUploadedFile(null)
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const result = await response.json()
      setUploadedFile(result)
      setFile(null)

      // Reset file input
      const fileInput = document.getElementById("file-input") as HTMLInputElement
      if (fileInput) fileInput.value = ""
    } catch (err) {
      setError("Failed to upload file. Please try again.")
      console.error("Upload error:", err)
    } finally {
      setUploading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4 font-serif">Upload IT Service Tickets</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Upload your CSV or Excel file containing IT service tickets for comprehensive analysis and insights.
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <SampleDataCard />
        </div>

        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-slate-900 font-serif">File Upload</CardTitle>
            <CardDescription className="text-slate-600">Supported formats: CSV, XLS, XLSX (Max 10MB)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {uploadedFile && (
              <Alert className="border-emerald-200 bg-emerald-50">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <AlertDescription className="text-emerald-800">
                  File uploaded successfully! Ready for analysis.
                </AlertDescription>
              </Alert>
            )}

            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-emerald-400 transition-colors">
              <Upload className="mx-auto h-12 w-12 text-slate-400 mb-4" />
              <div className="space-y-2">
                <p className="text-lg font-medium text-slate-700">Choose a file to upload</p>
                <p className="text-sm text-slate-500">CSV or Excel files up to 10MB</p>
              </div>
              <input
                id="file-input"
                type="file"
                accept=".csv,.xls,.xlsx"
                onChange={handleFileChange}
                className="mt-4 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
              />
            </div>

            {file && (
              <Card className="bg-slate-50 border-slate-200">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-emerald-600" />
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{file.name}</p>
                      <p className="text-sm text-slate-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <Button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700"
                  >
                    {uploading ? "Uploading..." : "Upload File"}
                  </Button>
                </CardContent>
              </Card>
            )}

            {uploadedFile && (
              <Card className="bg-emerald-50 border-emerald-200">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                    <div className="flex-1">
                      <p className="font-medium text-emerald-900">{uploadedFile.filename}</p>
                      <p className="text-sm text-emerald-700">{formatFileSize(uploadedFile.size)}</p>
                    </div>
                  </div>
                  <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                    <Link
                      href={`/analyze?file=${encodeURIComponent(uploadedFile.url)}&filename=${encodeURIComponent(uploadedFile.filename)}`}
                    >
                      Analyze File
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            <div className="text-center pt-4">
              <Link href="/" className="text-emerald-600 hover:text-emerald-700 font-medium">
                ← Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
