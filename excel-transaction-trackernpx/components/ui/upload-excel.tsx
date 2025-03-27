"use client"

import { useState } from "react"
import { UploadIcon, FileSpreadsheetIcon, CheckCircleIcon, AlertCircleIcon } from 'lucide-react'
import * as XLSX from "xlsx"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface UploadExcelProps {
  fullPage?: boolean
}

export function UploadExcel({ fullPage = false }: UploadExcelProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const [previewData, setPreviewData] = useState<any[] | null>(null)
  const [templateType, setTemplateType] = useState<"standard" | "custom">("standard")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      readExcelFile(selectedFile)
    }
  }

  const readExcelFile = async (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = e.target?.result
        const workbook = XLSX.read(data, { type: "binary" })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json(worksheet)
        setPreviewData(jsonData.slice(0, 5) as any[])
      } catch (error) {
        console.error("Error reading Excel file:", error)
      }
    }
    reader.readAsBinaryString(file)
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 300)

    // Simulate processing time
    setTimeout(() => {
      clearInterval(interval)
      setProgress(100)
      setUploading(false)
      setUploadStatus("success")
      
      // In a real app, this would process the Excel file and add transactions to the database
      console.log("File uploaded and processed:", file.name)
    }, 3000)
  }

  const handleDownloadTemplate = () => {
    // In a real app, this would generate and download an Excel template
    console.log("Downloading template for:", templateType)
  }

  return (
    <div className={`space-y-4 ${fullPage ? "max-w-2xl mx-auto" : ""}`}>
      {fullPage && (
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload File</TabsTrigger>
            <TabsTrigger value="template">Download Template</TabsTrigger>
          </TabsList>
          <TabsContent value="upload" className="space-y-4 pt-4">
            {renderUploadSection()}
          </TabsContent>
          <TabsContent value="template" className="space-y-4 pt-4">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Download a template file to ensure your data is formatted correctly for import.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="cursor-pointer hover:border-primary/50" onClick={() => setTemplateType("standard")}>
                  <CardContent className="p-4 flex flex-col items-center justify-center space-y-2">
                    <FileSpreadsheetIcon className="h-8 w-8 text-green-600" />
                    <div className="text-center">
                      <h3 className="font-medium">Standard Template</h3>
                      <p className="text-xs text-muted-foreground">Basic transaction format</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full ${templateType === "standard" ? "bg-primary" : "bg-muted"}`} />
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:border-primary/50" onClick={() => setTemplateType("custom")}>
                  <CardContent className="p-4 flex flex-col items-center justify-center space-y-2">
                    <FileSpreadsheetIcon className="h-8 w-8 text-blue-600" />
                    <div className="text-center">
                      <h3 className="font-medium">Custom Template</h3>
                      <p className="text-xs text-muted-foreground">Advanced transaction format</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full ${templateType === "custom" ? "bg-primary" : "bg-muted"}`} />
                  </CardContent>
                </Card>
              </div>
              <Button onClick={handleDownloadTemplate}>
                Download Template
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      )}

      {!fullPage && renderUploadSection()}
    </div>
  )

  function renderUploadSection() {
    return (
      <>
        <div 
          className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            const droppedFile = e.dataTransfer.files[0]
            if (droppedFile && droppedFile.type.includes("spreadsheet") || droppedFile.name.endsWith(".xlsx") || droppedFile.name.endsWith(".xls")) {
              setFile(droppedFile)
              readExcelFile(droppedFile)
            }
          }}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="rounded-full bg-primary/10 p-3">
              <UploadIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium">Upload Excel File</h3>
            <p className="text-xs text-muted-foreground max-w-xs">
              Drag and drop your Excel file here, or click to browse
            </p>
            <input
              type="file"
              id="excel-upload"
              className="hidden"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
            />
            <Button 
              variant="outline" 
              onClick={() => document.getElementById("excel-upload")?.click()}
              disabled={uploading}
            >
              Browse Files
            </Button>
          </div>
        </div>

        {file && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileSpreadsheetIcon className="h-5 w-5 text-green-600" />
                <span className="font-medium text-sm">{file.name}</span>
              </div>
              <Button 
                variant="default" 
                size="sm" 
                onClick={handleUpload}
                disabled={uploading || uploadStatus === "success"}
              >
                {uploading ? "Uploading..." : "Process File"}
              </Button>
            </div>

            {uploading && (
              <div className="space-y-2">
                <Progress value={progress} />
                <p className="text-xs text-muted-foreground text-right">{progress}% complete</p>
              </div>
            )}

            {uploadStatus === "success" && (
              <Alert variant="default" className="bg-green-50 border-green-200 text-green-800">
                <CheckCircleIcon className="h-4 w-4" />
                <AlertTitle>Upload Successful</AlertTitle>
                <AlertDescription>
                  Your Excel file has been processed successfully.
                </AlertDescription>
              </Alert>
            )}

            {uploadStatus === "error" && (
              <Alert variant="destructive">
                <AlertCircleIcon className="h-4 w-4" />
                <AlertTitle>Upload Failed</AlertTitle>
                <AlertDescription>
                  There was an error processing your Excel file. Please check the format and try again.
                </AlertDescription>
              </Alert>
            )}

            {previewData && previewData.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Preview (First 5 rows)</h4>
                <div className="rounded-md border overflow-x-auto">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr className="bg-muted/50">
                        {Object.keys(previewData[0]).map((key) => (
                          <th key={key} className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {previewData.map((row, index) => (
                        <tr key={index}>
                          {Object.values(row).map((value: any, i) => (
                            <td key={i} className="px-4 py-2 text-xs">
                              {value?.toString()}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </>
    )
  }
}