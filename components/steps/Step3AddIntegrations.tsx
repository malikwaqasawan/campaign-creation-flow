"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Edit, Trash2, Sparkles } from "lucide-react"
import { campaignData, type TrackingRule } from "../../lib/campaign-data"

interface Step3Props {
  googleSheetEnabled: boolean
  setGoogleSheetEnabled: (enabled: boolean) => void
  googleSheetUrl: string
  setGoogleSheetUrl: (url: string) => void
  trackingRules: TrackingRule[]
  setTrackingRules: React.Dispatch<React.SetStateAction<TrackingRule[]>>
  onBack: () => void
  onNext: () => void
}

export default function Step3AddIntegrations({
  googleSheetEnabled,
  setGoogleSheetEnabled,
  googleSheetUrl,
  setGoogleSheetUrl,
  trackingRules,
  setTrackingRules,
  onBack,
  onNext,
}: Step3Props) {
  const removeTrackingRule = (ruleId: number) => {
    setTrackingRules((prev) => prev.filter((rule) => rule.id !== ruleId))
  }

  const addTrackingRule = () => {
    const newRule = {
      id: Math.max(...trackingRules.map((r) => r.id), 0) + 1,
      text: "New tracking rule...",
    }
    setTrackingRules((prev) => [...prev, newRule])
  }

  const loadDefaultTrackingRules = () => {
    setTrackingRules(campaignData.defaultTrackingRules)
  }

  return (
    <Card className="w-full max-w-4xl py-0 rounded-2xl h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[60vh]">
      <div className="bg-white rounded-2xl h-full flex flex-col overflow-hidden">
        {/* Fixed header */}
        <div className="flex-shrink-0 p-11 pb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Add Integrations</h2>
          <p className="text-gray-600">Connect your tools to save time and reduce manual work.</p>
        </div>
        
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-11">
          <div className="flex-1 flex flex-col gap-4">
            {campaignData.integrations.map((integration) => (
              <div key={integration.id} className="space-y-4">
                <div className={`flex items-center justify-between p-4 border border-gray-400 rounded-lg ${!integration.enabled ? 'opacity-50' : ''}`}>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      {integration.icon === "google-sheets" ? (
                        <div className="w-6 h-6 bg-green-600 rounded grid grid-cols-3 gap-0.5 p-1">
                          {Array.from({ length: 9 }, (_, i) => (
                            <div key={i} className="bg-white rounded-sm" />
                          ))}
                        </div>
                      ) : (
                        <div className="w-6 h-6 bg-green-600 rounded text-white text-xs font-bold flex items-center justify-center">
                          S
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{integration.name}</h3>
                      <p className="text-sm font-normal text-gray-600">{integration.description}</p>
                    </div>
                  </div>
                  {integration.enabled ? (
                    <button
                      onClick={() => setGoogleSheetEnabled(!googleSheetEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${googleSheetEnabled ? "bg-black" : "bg-gray-200"
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${googleSheetEnabled ? "translate-x-6" : "translate-x-1"
                          }`}
                      />
                    </button>
                  ) : (
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                    </div>
                  )}
                </div>

                {integration.enabled && googleSheetEnabled && integration.placeholder && (
                  <div className="space-y-4 pl-4 border-l-2 border-gray-100">
                    <div>
                      <Input
                        placeholder={integration.placeholder}
                        value={googleSheetUrl}
                        onChange={(e) => setGoogleSheetUrl(e.target.value)}
                        className="w-full"
                      />
                      {integration.tip && (
                        <p className="text-xs text-gray-500 mt-1">{integration.tip}</p>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-medium text-gray-700">What to Track:</h4>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-purple-600 border-purple-200 hover:bg-purple-50 bg-transparent"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Regenerate with AI
                        </Button>
                      </div>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {trackingRules.map((rule) => (
                          <div key={rule.id} className="flex items-start space-x-3 p-2 bg-gray-50 rounded">
                            <div className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                              {rule.id}
                            </div>
                            <p className="text-xs text-gray-700 flex-1">{rule.text}</p>
                            <div className="flex space-x-1 flex-shrink-0">
                              <button className="text-gray-400 hover:text-gray-600">
                                <Edit className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => removeTrackingRule(rule.id)}
                                className="text-gray-400 hover:text-red-500"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Fixed footer */}
        <div className="flex-shrink-0 border-t border-gray-200 py-4 px-11">
          <div className="flex justify-between">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button onClick={onNext} className="bg-black text-white hover:bg-gray-800">
              Next
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
