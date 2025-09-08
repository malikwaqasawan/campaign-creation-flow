import campaignDataJson from './campaign-data.json'

export const campaignData = campaignDataJson

export type CampaignType = "seeding" | "paid" | "other" | null

export interface Step {
  id: number
  title: string
  description: string
  isActive: boolean
  isCompleted: boolean
}

export interface CampaignTypeOption {
  id: CampaignType
  title: string
  description: string
  icon: string
}

export interface ConnectedEmail {
  id: string
  address: string
}

export interface CampaignRule {
  id: number
  text: string
}

export interface TrackingRule {
  id: number
  text: string
}

export interface Integration {
  id: string
  name: string
  description: string
  icon: string
  enabled: boolean
  placeholder?: string
  tip?: string
}

export interface EmailProvider {
  id: string
  name: string
  description: string
}

export interface ProductInfo {
  name: string
  description: string
}

export interface EmailContent {
  subject: string
  body: string
}

export interface ExistingProduct {
  id: string
  name: string
  created: string
}
