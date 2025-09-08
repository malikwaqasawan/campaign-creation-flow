"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import LoadingOverlay from "@/components/ui/loading-overlay"
import {
  X,
  Sparkles,
  Bold,
  Italic,
  Underline,
  Link,
  RotateCcw,
} from "lucide-react"
import { campaignData, type ConnectedEmail } from "@/lib/campaign-data"

interface Step4Props {
  isEmailDraftMode: boolean
  setIsEmailDraftMode: (mode: boolean) => void
  emailProvider: "cheerful" | "external"
  setEmailProvider: (provider: "cheerful" | "external") => void
  connectedEmails: ConnectedEmail[]
  setConnectedEmails: React.Dispatch<React.SetStateAction<ConnectedEmail[]>>
  emailSearch: string
  setEmailSearch: (search: string) => void
  emailSubject: string
  setEmailSubject: (subject: string) => void
  emailBody: string
  setEmailBody: (body: string) => void
  onBack: () => void
  onGenerateEmail: () => void
  isGeneratingEmail: boolean
}

export default function Step4EmailSetup({
  isEmailDraftMode,
  setIsEmailDraftMode,
  emailProvider,
  setEmailProvider,
  connectedEmails,
  setConnectedEmails,
  emailSearch,
  setEmailSearch,
  emailSubject,
  setEmailSubject,
  emailBody,
  setEmailBody,
  onBack,
  onGenerateEmail,
  isGeneratingEmail,
}: Step4Props) {
  const removeEmail = (emailId: string) => {
    setConnectedEmails((prev) => prev.filter((email) => email.id !== emailId))
  }

  const loadDefaultEmailContent = () => {
    setEmailSubject(campaignData.defaultEmailContent.subject)
    setEmailBody(campaignData.defaultEmailContent.body)
  }

  const loadDefaultConnectedEmails = () => {
    setConnectedEmails(campaignData.defaultConnectedEmails)
  }

  return (
    <Card className="w-full max-w-4xl py-0 rounded-2xl h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[60vh]">
      <div className="bg-white rounded-2xl h-full flex flex-col overflow-hidden relative">
        {/* Loading overlay - covers entire card */}
        <LoadingOverlay 
          isVisible={isGeneratingEmail} 
          message="Generating your Email" 
        />

        {/* Fixed header */}
        <div className="flex-shrink-0 p-11 pb-6">
          {!isEmailDraftMode ? (
            <>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Email Setup</h2>
              <p className="text-gray-600">
                Configure your email provider, accounts, and recipients to launch your campaign.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Review Email Draft</h2>
              <p className="text-gray-600">
                Cheerful has drafted an email for you. Feel free to edit as you please.
              </p>
            </>
          )}
        </div>
        
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-11">
          {!isEmailDraftMode ? (
            <div className="flex-1 space-y-6">
                <div className="space-y-3">
                  {campaignData.emailProviders.map((provider) => (
                    <div
                      key={provider.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        emailProvider === provider.id
                          ? "border-black bg-gray-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setEmailProvider(provider.id as "cheerful" | "external")}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
                          {emailProvider === provider.id && <div className="w-2 h-2 bg-black rounded-full" />}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{provider.name}</h3>
                          <p className="text-sm text-gray-600">{provider.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-700">Add Connected Sending Accounts</h3>
                  <Input
                    placeholder="Search connected emails"
                    value={emailSearch}
                    onChange={(e) => setEmailSearch(e.target.value)}
                    className="w-full"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {connectedEmails.map((email) => (
                      <div
                        key={email.id}
                        className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full"
                      >
                        <span className="text-sm text-gray-700">{email.address}</span>
                        <button
                          onClick={() => removeEmail(email.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
          
          ) : (
            <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors"
                    onClick={() => {}}
                  >
                    <img 
                      src="/Vector.svg" 
                      alt="Upload CSV" 
                      className="w-6 h-6 mx-auto mb-2 text-gray-400"
                    />
                    <p className="text-sm text-gray-600">Click to upload CSV of Recipients</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject Line</label>
                  <div className="flex items-center space-x-2">
                    <Input
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      className="flex-1"
                    />
                    <button className="text-gray-400 hover:text-gray-600">
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Body</label>
                  <div className="border border-gray-300 rounded-lg">
                    <div className="flex items-center space-x-2 p-2 border-b border-gray-200">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Bold className="w-4 h-4" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Italic className="w-4 h-4" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Underline className="w-4 h-4" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Link className="w-4 h-4" />
                      </button>
                      <select className="text-sm border border-gray-200 rounded px-2 py-1">
                        <option># Merge Tags</option>
                      </select>
                      <Button size="sm" className="bg-purple-600 text-white hover:bg-purple-700">
                        Cheerify
                      </Button>
                    </div>
                    <Textarea
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      className="border-0 resize-none h-32"
                      placeholder="Hi {name},"
                    />
                  </div>
                </div>
              </div>
            )}
        </div>
        
        {/* Fixed footer */}
        <div className="flex-shrink-0 border-t border-gray-200 py-4 px-11">
          {!isEmailDraftMode ? (
            <div className="flex justify-between">
              <Button variant="outline" onClick={onBack}>
                Back
              </Button>
              <Button
                onClick={onGenerateEmail}
                disabled={connectedEmails.length === 0}
                className="bg-black text-white hover:bg-gray-800"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Email
              </Button>
            </div>
          ) : (
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setIsEmailDraftMode(false)}>
                Back
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700">
                Launch!
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
