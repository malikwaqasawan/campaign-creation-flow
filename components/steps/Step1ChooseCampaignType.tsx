"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Gift, DollarSign, Megaphone } from "lucide-react"
import { campaignData } from "@/lib/campaign-data"

type CampaignType = "seeding" | "paid" | "other" | null

interface Step1Props {
  selectedCampaignType: CampaignType
  setSelectedCampaignType: (type: CampaignType) => void
  otherCampaignText: string
  setOtherCampaignText: (text: string) => void
  onNext: () => void
  canProceed: () => boolean
}

const iconMap = {
  Gift,
  DollarSign,
  Megaphone,
}

export default function Step1ChooseCampaignType({
  selectedCampaignType,
  setSelectedCampaignType,
  otherCampaignText,
  setOtherCampaignText,
  onNext,
  canProceed,
}: Step1Props) {
  return (
    <Card className="w-full max-w-4xl py-0 rounded-2xl h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[60vh]">
      <div className="bg-white rounded-2xl h-full flex flex-col overflow-hidden">
        {/* Fixed header */}
        <div className="flex-shrink-0 p-11 pb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Choose Campaign Type</h2>
          <p className="text-gray-600">Select the best one that fits your goal.</p>
        </div>
        
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-11">
          {selectedCampaignType !== "other" ? (
            <div className="grid grid-cols-3 gap-4 mb-8">
              {campaignData.campaignTypes.map((type) => {
                const IconComponent = iconMap[type.icon as keyof typeof iconMap]
                return (
                  <div
                    key={type.id}
                    className={`p-6 border-2 rounded-xl cursor-pointer transition-colors ${selectedCampaignType === type.id
                        ? "border-black bg-gray-200"
                        : "border-gray-200 hover:border-gray-300"
                      }`}
                    onClick={() => setSelectedCampaignType(type.id as CampaignType)}
                  >
                    <div className="text-center">
                      <IconComponent className="w-12 h-12 mx-auto my-8 text-gray-600" />
                      <h3 className="font-semibold text-black mb-3">{type.title}</h3>
                      <p className="text-sm font-normal text-gray-600">{type.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                <Megaphone className="w-6 h-6 text-gray-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Other</h3>
                  <p className="text-sm font-normal text-gray-600">
                    For all other types of creator collaboration campaigns.
                  </p>
                </div>
              </div>
              <Textarea
                placeholder="Tell us what your goal is for this campaign..."
                value={otherCampaignText}
                onChange={(e) => setOtherCampaignText(e.target.value)}
                className="min-h-32"
              />
            </div>
          )}
        </div>
        
        {/* Fixed footer */}
        <div className="flex-shrink-0 border-t border-gray-200 py-4 px-11">
          {selectedCampaignType === "other" ? (
            <div className="flex gap-4 justify-between">
              <Button variant="outline" onClick={() => setSelectedCampaignType(null)}>
                Back
              </Button>
              <Button
                onClick={onNext}
                disabled={!canProceed()}
                className="bg-black text-white hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500"
              >
                Next
              </Button>
            </div>
          ) : (
            <div className="flex justify-end">
              <Button
                onClick={onNext}
                disabled={!canProceed()}
                className="bg-black text-white hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
