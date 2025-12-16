"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Plan = "Free" | "Bronze" | "Silver" | "Gold"

type UserContextType = {
  plan: Plan
  upgradeToPlan: (plan: Plan) => void
  upgradeToPremium: () => void
  isPremium: boolean
  hasBronzeAccess: boolean
  hasSilverAccess: boolean
  hasGoldAccess: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Plan>("Free")

  const upgradeToPlan = (newPlan: Plan) => {
    setPlan(newPlan)
  }

  const upgradeToPremium = () => {
    setPlan("Gold")
  }

  const isPremium = plan !== "Free"

  const hasBronzeAccess = plan === "Bronze" || plan === "Silver" || plan === "Gold"
  const hasSilverAccess = plan === "Silver" || plan === "Gold"
  const hasGoldAccess = plan === "Gold"

  return (
    <UserContext.Provider
      value={{ plan, upgradeToPlan, upgradeToPremium, isPremium, hasBronzeAccess, hasSilverAccess, hasGoldAccess }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
