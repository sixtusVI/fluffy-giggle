"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeftIcon, CalendarIcon, DownloadIcon } from 'lucide-react'
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

export default function ExportPage() {
  const router = useRouter()
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())
  const [exportType, setExportType] = useState<"all" | "incoming" | "outgoing">("all")
  const [fileFormat, setFileFormat] = useState("xlsx")
  const [includeFields, setIncludeFields] = useState({
    id: true,
    date: true,
    description: true,
    category: true,
    amount: true,
    type: true,
    status: true
  })

  const handleExport = () => {
    // In a real app, this would generate and download the Excel file
    console.log("Exporting transactions:", {
      startDate,
      endDate,
      exportType,
      fileFormat,
      includeFields
    })
    
    // Simulate download
    setTimeout(() => {
      alert("Export completed! File downloaded.")
      router.push("/")
    }, 1500)
  }

  const toggleField = (field: keyof typeof includeFields) => {
    setIncludeFields({
      ...includeFields,
      [field]: !includeFields[field]
    })
  }

  return (
    <div className="container max-w-2xl py-8">
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => router.push("/")}
      >
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle>Export Transactions</CardTitle>
          <CardDescription>
            Configure your export settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Date Range</Label>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 space-y-1">
                <Label htmlFor="start-date" className="text-xs">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="start-date"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex-1 space-y-1">
                <Label htmlFor="end-date" className="text-xs">End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="end-date"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="transaction-type">Transaction Type</Label>
            <RadioGroup 
              id="transaction-type" 
              value={exportType} 
              onValueChange={(value: "all" | "incoming" | "outgoing") => setExportType(value)}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all" className="font-normal">All Transactions</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="incoming" id="incoming-only" />
                <Label htmlFor="incoming-only" className="font-normal">Incoming Only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="outgoing" id="outgoing-only" />
                <Label htmlFor="outgoing-only" className="font-normal">Outgoing Only</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="file-format">File Format</Label>
            <Select value={fileFormat} onValueChange={setFileFormat}>
              <SelectTrigger id="file-format">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
                <SelectItem value="csv">CSV (.csv)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Include Fields</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-id" 
                  checked={includeFields.id}
                  onCheckedChange={() => toggleField("id")}
                />
                <Label htmlFor="include-id" className="font-normal">ID</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-date" 
                  checked={includeFields.date}
                  onCheckedChange={() => toggleField("date")}
                />
                <Label htmlFor="include-date" className="font-normal">Date</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-description" 
                  checked={includeFields.description}
                  onCheckedChange={() => toggleField("description")}
                />
                <Label htmlFor="include-description" className="font-normal">Description</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-category" 
                  checked={includeFields.category}
                  onCheckedChange={() => toggleField("category")}
                />
                <Label htmlFor="include-category" className="font-normal">Category</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-amount" 
                  checked={includeFields.amount}
                  onCheckedChange={() => toggleField("amount")}
                />
                <Label htmlFor="include-amount" className="font-normal">Amount</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-type" 
                  checked={includeFields.type}
                  onCheckedChange={() => toggleField("type")}
                />
                <Label htmlFor="include-type" className="font-normal">Type</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-status" 
                  checked={includeFields.status}
                  onCheckedChange={() => toggleField("status")}
                />
                <Label htmlFor="include-status" className="font-normal">Status</Label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/")}>
            Cancel
          </Button>
          <Button onClick={handleExport}>
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export Transactions
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}