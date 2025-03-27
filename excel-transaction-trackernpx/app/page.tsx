import { Metadata } from "next"
import Link from "next/link"
import { ArrowDownIcon, ArrowUpIcon, DownloadIcon, UploadIcon } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TransactionTable } from "@/components/ui/transaction-table"
import { UploadExcel } from "@/components/ui/upload-excel"

export const metadata: Metadata = {
  title: "Transaction Tracker",
  description: "Track incoming and outgoing transactions with Excel integration",
}

export default function Page() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1">
        <div className="container flex flex-col gap-4 py-8 md:gap-8 md:py-10">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div className="grid gap-1">
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Transaction Tracker</h1>
              <p className="text-muted-foreground">
                Manage your incoming and outgoing transactions with Excel integration
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/transactions/new">
                <Button>Add Transaction</Button>
              </Link>
              <Link href="/export">
                <Button variant="outline">
                  <DownloadIcon className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </Link>
            </div>
          </div>
          <Tabs defaultValue="dashboard" className="space-y-4">
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="import">Import</TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$12,580.00</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Income</CardTitle>
                    <ArrowUpIcon className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$4,395.00</div>
                    <p className="text-xs text-muted-foreground">+10.1% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Expenses</CardTitle>
                    <ArrowDownIcon className="h-4 w-4 text-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$1,795.00</div>
                    <p className="text-xs text-muted-foreground">+19% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$450.00</div>
                    <p className="text-xs text-muted-foreground">2 transactions pending</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>
                      You had 12 transactions this month
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TransactionTable limit={5} />
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Quick Import</CardTitle>
                    <CardDescription>
                      Upload an Excel file to import transactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UploadExcel />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="transactions">
              <Card>
                <CardHeader>
                  <CardTitle>All Transactions</CardTitle>
                  <CardDescription>
                    View and manage all your transactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TransactionTable />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="import">
              <Card>
                <CardHeader>
                  <CardTitle>Import Transactions</CardTitle>
                  <CardDescription>
                    Upload Excel files to import transactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <UploadExcel fullPage />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
