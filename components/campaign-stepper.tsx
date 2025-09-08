"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import {
  ChevronRight,
  Plus,
  Mail,
  FileText,
  Percent,
} from "lucide-react"
import { campaignData, type CampaignType, type Step, type ConnectedEmail, type CampaignRule, type TrackingRule } from "@/lib/campaign-data"
import Step1ChooseCampaignType from "./steps/Step1ChooseCampaignType"
import Step2AddCampaignInfo from "./steps/Step2AddCampaignInfo"
import Step3AddIntegrations from "./steps/Step3AddIntegrations"
import Step4EmailSetup from "./steps/Step4EmailSetup"

export default function CampaignStepper() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCampaignType, setSelectedCampaignType] = useState<CampaignType>(null)
  const [otherCampaignText, setOtherCampaignText] = useState("")
  const [isReviewMode, setIsReviewMode] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false)
  const [isEmailDraftMode, setIsEmailDraftMode] = useState(false)
  
  // Product and campaign data
  const [productName, setProductName] = useState(campaignData.defaultProductInfo.name)
  const [productDescription, setProductDescription] = useState(campaignData.defaultProductInfo.description)
  const [campaignRules, setCampaignRules] = useState<CampaignRule[]>(campaignData.defaultCampaignRules)
  
  // Integration data
  const [googleSheetEnabled, setGoogleSheetEnabled] = useState(false)
  const [googleSheetUrl, setGoogleSheetUrl] = useState("")
  const [trackingRules, setTrackingRules] = useState<TrackingRule[]>(campaignData.defaultTrackingRules)
  
  // Email data
  const [emailProvider, setEmailProvider] = useState<"cheerful" | "external">("cheerful")
  const [connectedEmails, setConnectedEmails] = useState<ConnectedEmail[]>(campaignData.defaultConnectedEmails)
  const [emailSearch, setEmailSearch] = useState("")
  const [emailSubject, setEmailSubject] = useState(campaignData.defaultEmailContent.subject)
  const [emailBody, setEmailBody] = useState(campaignData.defaultEmailContent.body)

  const steps: Step[] = campaignData.steps.map((step) => ({
    ...step,
    isActive: (step.id === 1 && currentStep === 1) ||
             (step.id === 2 && currentStep === 2 && !isReviewMode) ||
             (step.id === 3 && currentStep === 2 && isReviewMode) ||
             (step.id === 4 && currentStep === 3) ||
             (step.id === 5 && currentStep === 4 && !isEmailDraftMode),
    isCompleted: currentStep > step.id
  }))

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = () => {
    if (currentStep === 1) {
      return selectedCampaignType !== null && (selectedCampaignType !== "other" || otherCampaignText.trim() !== "")
    }
    if (currentStep === 2 && !isReviewMode) {
      return true // Always allow proceeding from step 2
    }
    return true
  }

  const handleScan = () => {
    setIsScanning(true)
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false)
      setIsReviewMode(true)
    }, 3000) // 3 second loading
  }

  const handleGenerateEmail = () => {
    setIsGeneratingEmail(true)
    // Simulate email generation process
    setTimeout(() => {
      setIsGeneratingEmail(false)
      setIsEmailDraftMode(true)
    }, 3000) // 3 second loading
  }

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeStepElement = scrollContainerRef.current.querySelector(`[data-step="${currentStep}"]`)
      if (activeStepElement) {
        activeStepElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }
    }
  }, [currentStep, isReviewMode, isEmailDraftMode])

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="fixed left-0 top-0 h-full bg-white border-r border-gray-200 flex flex-col items-center z-50">
        <div className="flex items-center justify-center mb-5  border-b border-gray-200">
          <img 
            src="/Cheerful_bot_icon3 1.svg" 
            alt="Cheerful Bot" 
            className="min-w-8 min-h-8 block p-5 px-4"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <Plus className="w-4 h-4 text-white" />
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center">
            <Mail className="w-4 h-4 text-gray-600" />
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center">
            <FileText className="w-4 h-4 text-gray-600" />
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center">
            <Percent className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      </div>

      <div className="fixed top-0 left-16 right-0 bg-white/80 backdrop-blur-sm z-40 p-6 border-b border-gray-200">
        <div className="flex justify-start items-center mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Untitled Campaign</h1>
        </div>
      </div>

      {/* Desktop Stepper Indicator */}
      <div className="fixed left-[14%] top-1/2 -translate-y-1/2 z-30 hidden lg:block max-h-[80vh] overflow-hidden">
        <div className="text-sm text-gray-500 mb-4">{currentStep}/4</div>
        <div className="relative">
          {[1, 2, 3, 4].map((stepNum, index) => {
            const isActive = (stepNum === 1 && currentStep === 1) || 
                           (stepNum === 2 && currentStep === 2) || 
                           (stepNum === 3 && currentStep === 3) || 
                           (stepNum === 4 && currentStep === 4)
            const isCompleted = currentStep > stepNum
            
              return (
                <div key={stepNum} className="flex items-center relative mb-[8vh] sm:mb-[10vh] md:mb-[12vh] lg:mb-[14vh] xl:mb-[14vh] last:mb-0">
                <div className="relative">
                  <div
                    className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full border-2 ${
                        isCompleted 
                          ? "bg-black border-black" 
                          : isActive 
                            ? "bg-white border-black" 
                            : "bg-white border-gray-300"
                    }`}
                  />
                  {isCompleted && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                {isActive && (
                  <div className="ml-2 sm:ml-2 md:ml-3 lg:ml-3">
                    <div className="w-0 h-0 border-l-[6px] sm:border-l-[7px] md:border-l-[7px] lg:border-l-[8px] border-l-black border-t-[4px] sm:border-t-[5px] md:border-t-[5px] lg:border-t-[6px] border-t-transparent border-b-[4px] sm:border-b-[5px] md:border-b-[5px] lg:border-b-[6px] border-b-transparent"></div>
                  </div>
                )}
                {index < 3 && (
                  <div 
                    className={`absolute top-3 sm:top-4 md:top-5 lg:top-6 left-0.5 sm:left-1 md:left-1.5 lg:left-2 w-1 sm:w-1.5 md:w-2 lg:w-2 h-[8vh] sm:h-[10vh] md:h-[12vh] lg:h-[14vh] xl:h-[14vh] ${
                      isCompleted ? "bg-black" : "bg-gray-300"
                }`}
              />
                )}
            </div>
            )
          })}
        </div>
      </div>

      {/* Mobile Stepper Indicator */}
      <div className="fixed top-16 sm:top-14 md:top-16 left-1/2 -translate-x-1/2 z-30 lg:hidden">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="text-sm text-gray-500">{currentStep}/4</div>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4].map((stepNum) => {
                const isActive = (stepNum === 1 && currentStep === 1) || 
                               (stepNum === 2 && currentStep === 2) || 
                               (stepNum === 3 && currentStep === 3) || 
                               (stepNum === 4 && currentStep === 4)
                const isCompleted = currentStep > stepNum
                
                return (
                  <div key={stepNum} className="flex items-center">
                    <div className="relative">
                      <div
                        className={`w-3 h-3 rounded-full border-2 ${
                            isCompleted 
                              ? "bg-black border-black" 
                              : isActive 
                                ? "bg-white border-black" 
                                : "bg-white border-gray-300"
                        }`}
                      />
                      {isCompleted && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-1.5 h-1.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                </div>
                      )}
              </div>
                    {stepNum < 4 && (
                      <div 
                        className={`w-3 h-0.5 mx-1 ${
                          isCompleted ? "bg-black" : "bg-gray-300"
                        }`} 
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>


      {/* Main Content */}
      <div
        className="pt-24 pb-8 overflow-hidden h-screen"
        ref={scrollContainerRef}
      >
        <div className="space-y-8">
          {/* Step 1 */}
          <div data-step="1" className="flex justify-center px-8 mt-[4vh] sm:mt-[2vh] md:mt-[4vh] lg:mt-[14vh]">
            <div className={`w-full max-w-4xl transition-all duration-300 ${
                currentStep === 1
                  ? "border-2 border-transparent bg-gradient-to-b from-[#B04ADC] via-[#FF7247] to-[#F3B246] opacity-100"
                  : "border border-gray-200 opacity-50"
            } rounded-2xl`}>
              <Step1ChooseCampaignType
                selectedCampaignType={selectedCampaignType}
                setSelectedCampaignType={setSelectedCampaignType}
                otherCampaignText={otherCampaignText}
                setOtherCampaignText={setOtherCampaignText}
                onNext={handleNext}
                canProceed={canProceed}
              />
              </div>
          </div>

          {/* Step 2 */}
          <div data-step="2" className="flex justify-center px-8">
            <div className={`w-full max-w-4xl transition-all duration-300 ${
                currentStep === 2
                  ? "border-2 border-transparent bg-gradient-to-b from-[#B04ADC] via-[#FF7247] to-[#F3B246] opacity-100"
                  : "border border-gray-200 opacity-50"
            } rounded-2xl`}>
              <Step2AddCampaignInfo
                isReviewMode={isReviewMode}
                setIsReviewMode={setIsReviewMode}
                productName={productName}
                setProductName={setProductName}
                productDescription={productDescription}
                setProductDescription={setProductDescription}
                campaignRules={campaignRules}
                setCampaignRules={setCampaignRules}
                onBack={handleBack}
                onNext={handleNext}
                onScan={handleScan}
                canProceed={canProceed}
                isScanning={isScanning}
                            />
                          </div>
          </div>

          {/* Step 3 */}
          <div data-step="3" className="flex justify-center px-8">
            <div className={`w-full max-w-4xl transition-all duration-300 ${
                currentStep === 3
                  ? "border-2 border-transparent bg-gradient-to-b from-[#B04ADC] via-[#FF7247] to-[#F3B246] opacity-100"
                  : "border border-gray-200 opacity-50"
            } rounded-2xl`}>
              <Step3AddIntegrations
                googleSheetEnabled={googleSheetEnabled}
                setGoogleSheetEnabled={setGoogleSheetEnabled}
                googleSheetUrl={googleSheetUrl}
                setGoogleSheetUrl={setGoogleSheetUrl}
                trackingRules={trackingRules}
                setTrackingRules={setTrackingRules}
                onBack={handleBack}
                onNext={handleNext}
              />
              </div>
          </div>

          {/* Step 4 */}
          <div data-step="4" className="flex justify-center px-8 mb-[4vh] sm:mb-[2vh] md:mb-[4vh] lg:mb-[14vh]">
            <div className={`w-full max-w-4xl transition-all duration-300 ${
                currentStep === 4
                  ? "border-2 border-transparent bg-gradient-to-b from-[#B04ADC] via-[#FF7247] to-[#F3B246] opacity-100"
                  : "border border-gray-200 opacity-50"
            } rounded-2xl`}>
              <Step4EmailSetup
                isEmailDraftMode={isEmailDraftMode}
                setIsEmailDraftMode={setIsEmailDraftMode}
                emailProvider={emailProvider}
                setEmailProvider={setEmailProvider}
                connectedEmails={connectedEmails}
                setConnectedEmails={setConnectedEmails}
                emailSearch={emailSearch}
                setEmailSearch={setEmailSearch}
                emailSubject={emailSubject}
                setEmailSubject={setEmailSubject}
                emailBody={emailBody}
                setEmailBody={setEmailBody}
                onBack={handleBack}
                onGenerateEmail={handleGenerateEmail}
                isGeneratingEmail={isGeneratingEmail}
                            />
                          </div>
          </div>
        </div>
      </div>
    </div>
  )
}