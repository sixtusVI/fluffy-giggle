"use client"

import { useState } from "react"
import { ArrowDownIcon, ArrowUpIcon, ArrowUpDownIcon, ChevronDownIcon, DownloadIcon, FilterIcon } from 'lucide-react'
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Sample transaction data
const transactions = [
  {
    id: "T-1001",
    date: new Date("2023-03-15"),
    description: "Client Payment - ABC Corp",
    category: "Income",
    amount: 2500.00,
    type: "incoming",
    status: "completed",
  },
  {
    id: "T-1002",
    date: new Date("2023-03-16"),
    description: "Office Supplies",
    category: "Expense",
    amount: 125.50,
    type: "outgoing",
    status: "completed",
  },
  {
    id: "T-1003",
    date: new Date("2023-03-18"),
    description: "Freelance Work",
    category: "Income",
    amount: 750.00,
    type: "incoming",
    status: "completed",
  },
  {
    id: "T-1004",
    date: new Date("2023-03-20"),
    description: "Software Subscription",
    category: "Expense",
    amount: 49.99,
    type: "outgoing",
    status: "completed",
  },
  {
    id: "T-1005",
    date: new Date("2023-03-22"),
    description: "Client Deposit - XYZ Inc",
    category: "Income",
    amount: 1000.00,
    type: "incoming",
    status: "pending",
  },
  {
    id: "T-1006",
    date: new Date("2023-03-25"),
    description: "Marketing Services",
    category: "Expense",
    amount: 450.00,
    type: "outgoing",
    status: "pending",
  },
  {
    id: "T-1007",
    date: new Date("2023-03-27"),
    description: "Consulting Fee",
    category: "Income",
    amount: 1200.00,
    type: "incoming",
    status: "completed",
  },
  {
    id: "T-1008",
    date: new Date("2023-03-28"),
    description: "Office Rent",
    category: "Expense",
    amount: 1500.00,
    type: "outgoing",
    status: "completed",
  },
]

interface TransactionTableProps {
  limit?: number
}

export function TransactionTable({ limit }: TransactionTableProps) {
  const [sorting, setSorting] = useState<"asc" | "desc" | null>(null)
  const [sortField, setSortField] = useState<string | null>(null)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const displayedTransactions = transactions
    .filter(transaction => 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sorting || !sortField) return 0
      
      if (sortField === "amount") {
        return sorting === "asc" ? a.amount - b.amount : b.amount - a.amount
      }
      
      if (sortField === "date") {
        return sorting === "asc" 
          ? a.date.getTime() - b.date.getTime() 
          : b.date.getTime() - a.date.getTime()
      }
      
      return 0
    })
    .slice(0, limit || transactions.length)

  const handleSort = (field: string) => {
    if (sortField === field) {
      if (sorting === "asc") setSorting("desc")
      else if (sorting === "desc") {
        setSorting(null)
        setSortField(null)
      }
    } else {
      setSortField(field)
      setSorting("asc")
    }
  }

  const handleSelectAll = () => {
    if (selectedRows.length === displayedTransactions.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(displayedTransactions.map(t => t.id))
    }
  }

  const handleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id))
    } else {
      setSelectedRows([...selectedRows, id])
    }
  }

  const handleExportSelected = () => {
    console.log("Exporting selected transactions:", selectedRows)
    // In a real app, this would trigger the Excel export functionality
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <FilterIcon className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                All Transactions
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Incoming Only
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Outgoing Only
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuCheckboxItem checked>
                Completed
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>
                Pending
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {selectedRows.length > 0 && (
          <Button variant="outline" size="sm" onClick={handleExportSelected}>
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export Selected
          </Button>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox 
                  checked={selectedRows.length === displayedTransactions.length && displayedTransactions.length > 0}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead className="w-[100px]">
                <div className="flex items-center space-x-1">
                  <span>ID</span>
                </div>
              </TableHead>
              <TableHead className="w-[120px]">
                <div 
                  className="flex items-center space-x-1 cursor-pointer"
                  onClick={() => handleSort("date")}
                >
                  <span>Date</span>
                  {sortField === "date" ? (
                    sorting === "asc" ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />
                  ) : (
                    <ArrowUpDownIcon className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="w-[120px]">
                <div 
                  className="flex items-center space-x-1 cursor-pointer"
                  onClick={() => handleSort("amount")}
                >
                  <span>Amount</span>
                  {sortField === "amount" ? (
                    sorting === "asc" ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />
                  ) : (
                    <ArrowUpDownIcon className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead className="w-[120px]">Type</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <Checkbox 
                    checked={selectedRows.includes(transaction.id)}
                    onCheckedChange={() => handleSelectRow(transaction.id)}
                    aria-label={`Select transaction ${transaction.id}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{transaction.id}</TableCell>
                <TableCell>{format(transaction.date, "MMM dd, yyyy")}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell className={transaction.type === "incoming" ? "text-green-600" : "text-red-600"}>
                  {transaction.type === "incoming" ? "+" : "-"}${transaction.amount.toFixed(2)}
                </TableCell>
                <TableCell>
                  {transaction.type === "incoming" ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <ArrowUpIcon className="mr-1 h-3 w-3" />
                      Incoming
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      <ArrowDownIcon className="mr-1 h-3 w-3" />
                      Outgoing
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {transaction.status === "completed" ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Completed
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      Pending
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <ChevronDownIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {displayedTransactions.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}