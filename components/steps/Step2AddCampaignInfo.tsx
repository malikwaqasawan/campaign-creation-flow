"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import LoadingOverlay from "@/components/ui/loading-overlay"
import {
  FileText,
  Trash2,
  Edit,
  Sparkles,
} from "lucide-react"
import { campaignData, type CampaignRule } from "../../lib/campaign-data"

interface UploadedFile {
  id: string
  name: string
  progress: number
  isUploading: boolean
}

interface Step2Props {
  isReviewMode: boolean
  setIsReviewMode: (mode: boolean) => void
  productName: string
  setProductName: (name: string) => void
  productDescription: string
  setProductDescription: (desc: string) => void
  campaignRules: CampaignRule[]
  setCampaignRules: React.Dispatch<React.SetStateAction<CampaignRule[]>>
  onBack: () => void
  onNext: () => void
  onScan: () => void
  canProceed: () => boolean
  isScanning: boolean
}

export default function Step2AddCampaignInfo({
  isReviewMode,
  setIsReviewMode,
  productName,
  setProductName,
  productDescription,
  setProductDescription,
  campaignRules,
  setCampaignRules,
  onBack,
  onNext,
  onScan,
  canProceed,
  isScanning,
}: Step2Props) {
  const [activeTab, setActiveTab] = useState<"new" | "existing">("new")
  const [productUrl, setProductUrl] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  const handleFileUpload = (event?: React.ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files
    if (!files || files.length === 0) return

    Array.from(files).forEach((file) => {
      const newFile: UploadedFile = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        progress: 0,
        isUploading: true,
      }

      setUploadedFiles((prev) => [...prev, newFile])

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadedFiles((prev) =>
          prev.map((f) => (f.id === newFile.id ? { ...f, progress: Math.min(f.progress + 20, 100) } : f)),
        )
      }, 200)

      // Complete upload after 1 second
      setTimeout(() => {
        clearInterval(interval)
        setUploadedFiles((prev) =>
          prev.map((f) => (f.id === newFile.id ? { ...f, progress: 100, isUploading: false } : f)),
        )
      }, 1000)
    })
  }

  const handleClickUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.pdf,.csv,.doc,.docx,.txt'
    input.multiple = true
    input.onchange = (event) => {
      const target = event.target as HTMLInputElement
      handleFileUpload({ target } as React.ChangeEvent<HTMLInputElement>)
    }
    input.click()
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const removeRule = (ruleId: number) => {
    setCampaignRules((prev) => prev.filter((rule) => rule.id !== ruleId))
  }

  const addRule = () => {
    const newRule = {
      id: Math.max(...campaignRules.map((r) => r.id), 0) + 1,
      text: "New campaign rule...",
    }
    setCampaignRules((prev) => [...prev, newRule])
  }

  const handleScan = () => {
    if (uploadedFiles.length > 0) {
      // Simulate scanning and populate with default data
      setProductName(campaignData.defaultProductInfo.name)
      setProductDescription(campaignData.defaultProductInfo.description)
      setCampaignRules(campaignData.defaultCampaignRules)
      setIsReviewMode(true)
      onScan()
    }
  }

  return (
    <Card className="w-full max-w-4xl py-0 rounded-2xl h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[60vh]">
      <div className="bg-white rounded-2xl h-full flex flex-col overflow-hidden relative">
        {/* Loading overlay - covers entire card */}
        <LoadingOverlay 
          isVisible={isScanning} 
          message="Gathering your campaign information" 
        />

        {/* Fixed header */}
        <div className="flex-shrink-0 p-11 pb-6">
          {!isReviewMode ? (
            <>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Add Campaign Information</h2>
              <p className="text-gray-600">
                Upload a file or paste a link — we'll pull the product and campaign details for you.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Review Campaign Information</h2>
              <p className="text-gray-600">
                We've pulled product info and campaign rules from your files. Review and edit if needed.
              </p>
            </>
          )}
        </div>
        
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-11 pb-4">
          {!isReviewMode ? (
            <div className="flex-1 flex flex-col">
              {/* Tabs */}
              <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "new"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setActiveTab("new")}
                >
                  New Product
                </button>
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "existing"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setActiveTab("existing")}
                >
                  Existing Products
                </button>
              </div>

              {activeTab === "new" ? (
                <div className="space-y-6 flex-1">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product URL (optional)
                    </label>
                    <Input
                      placeholder="Paste link"
                      value={productUrl}
                      onChange={(e) => setProductUrl(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">File Upload</label>
                    {uploadedFiles.length === 0 ? (
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors h-48 flex flex-col justify-center mb-6"
                        onClick={handleClickUpload}
                      >
                        <img 
                          src="/Vector.svg" 
                          alt="Upload file" 
                          className="w-12 h-12 mx-auto mb-4 text-gray-400"
                        />
                        <p className="text-gray-600 mb-1">Drop in your product/campaign info</p>
                        <p className="text-gray-600 font-medium">Click to upload</p>
                        <p className="text-xs text-gray-500 mt-2">PDF/CSV</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                          <div
                            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors"
                            onClick={handleClickUpload}
                          >
                          <img
                            src="/Vector.svg"
                            alt="Upload file"
                            className="w-6 h-6 mx-auto mb-2 text-gray-400"
                          />
                          <p className="text-sm text-gray-600">Click to upload</p>
                        </div>
                        {uploadedFiles.map((file) => (
                          <div
                            key={file.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <FileText className="w-5 h-5 text-gray-400" />
                              <span className="text-sm text-gray-700">{file.name}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              {file.progress < 100 ? (
                                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-red-500 transition-all duration-300"
                                    style={{ width: `${file.progress}%` }}
                                  />
                                </div>
                              ) : (
                                <button
                                  onClick={() => removeFile(file.id)}
                                  className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-6 flex-1">
                  <div>
                    <Input placeholder="Summer Yeti Cooler..." className="w-full" />
                  </div>
                  <div className="flex-1 overflow-y-auto space-y-2">
                    {campaignData.existingProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                      >
                        <span className="text-sm text-gray-700">{product.name}</span>
                        <span className="text-xs text-gray-500">Created {product.created}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                  <Input
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Description</label>
                  <Textarea
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="w-full h-48 resize-none"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-700">Campaign Rules</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-purple-600 border-purple-200 hover:bg-purple-50 bg-transparent"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Regenerate with AI
                  </Button>
                </div>
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {campaignRules.map((rule) => (
                    <div key={rule.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                        {rule.id}
                      </div>
                      <p className="text-sm text-gray-700 flex-1">{rule.text}</p>
                      <div className="flex space-x-1 flex-shrink-0">
                        <button className="text-gray-400 hover:text-gray-600">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeRule(rule.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" onClick={addRule} className="w-full bg-transparent">
                  Add Rule
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Fixed footer */}
        <div className="flex-shrink-0 border-t border-gray-200 py-4 px-11">
          {!isReviewMode ? (
            <div className="flex justify-between">
              <Button variant="outline" onClick={onBack}>
                Back
              </Button>
              <Button
                onClick={handleScan}
                disabled={!canProceed() || isScanning}
                className={`px-8 ${
                  canProceed() && !isScanning
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isScanning ? "Scanning..." : "Scan"}
              </Button>
            </div>
          ) : (
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setIsReviewMode(false)}>
                Back
              </Button>
              <Button onClick={onNext} className="bg-black text-white hover:bg-gray-800">
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}