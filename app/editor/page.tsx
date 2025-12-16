"use client"

import type React from "react"

import { useState } from "react"
import { useUser } from "@/lib/user-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Upload, Download, RotateCcw, ImageIcon, Sparkles, Lock, Crown, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

type Filter = {
  id: string
  name: string
  description: string
  tier: "Free" | "Bronze" | "Silver" | "Gold"
  intensity: number
}

type Watermark = {
  id: string
  text: string
  position: string
  opacity: number
  font: string
}

export default function EditorPage() {
  const { plan, upgradeToPremium, isPremium, hasBronzeAccess, hasSilverAccess, hasGoldAccess } = useUser()

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [filters, setFilters] = useState<Filter[]>([
    { id: "grayscale", name: "Grayscale", description: "Convert to grayscale", tier: "Free", intensity: 0 },
    { id: "contrast", name: "Contrast", description: "Increase contrast", tier: "Free", intensity: 0 },
    { id: "sepia", name: "Sepia", description: "Vintage sepia tone", tier: "Bronze", intensity: 0 },
    { id: "brightness", name: "Brightness", description: "Adjust brightness", tier: "Bronze", intensity: 0 },
    { id: "saturation", name: "Saturation", description: "Boost color saturation", tier: "Bronze", intensity: 0 },
    { id: "vintage", name: "Vintage", description: "Retro film effect", tier: "Bronze", intensity: 0 },
    { id: "blur", name: "Blur", description: "Gaussian blur effect", tier: "Silver", intensity: 0 },
    { id: "duotone", name: "Blue-Red Duotone", description: "Two-color gradient effect", tier: "Silver", intensity: 0 },
    { id: "vignette", name: "Vignette", description: "Darken edges", tier: "Silver", intensity: 0 },
    { id: "sharpen", name: "Sharpen", description: "Enhance edge definition", tier: "Silver", intensity: 0 },
    { id: "warm", name: "Warm Tone", description: "Add warm color cast", tier: "Silver", intensity: 0 },
    { id: "cool", name: "Cool Tone", description: "Add cool color cast", tier: "Silver", intensity: 0 },
    { id: "background-blur", name: "Background Blur", description: "Blur background only", tier: "Gold", intensity: 0 },
    { id: "bokeh", name: "Bokeh Effect", description: "Professional depth of field", tier: "Gold", intensity: 0 },
    { id: "hdr", name: "HDR", description: "High dynamic range", tier: "Gold", intensity: 0 },
    { id: "ai-enhance", name: "AI Enhancement", description: "AI-powered quality boost", tier: "Gold", intensity: 0 },
    { id: "chromatic", name: "Chromatic Aberration", description: "Color fringing effect", tier: "Gold", intensity: 0 },
  ])
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set())

  const [watermarks, setWatermarks] = useState<Watermark[]>([
    { id: "1", text: "© 2025 MyBrand", position: "bottom-right", opacity: 60, font: "Inter" },
    { id: "2", text: "CONFIDENTIAL", position: "center", opacity: 40, font: "Arial" },
  ])
  const [selectedWatermark, setSelectedWatermark] = useState<Watermark | null>(null)
  const [watermarkText, setWatermarkText] = useState("")
  const [watermarkPosition, setWatermarkPosition] = useState("bottom-right")
  const [watermarkOpacity, setWatermarkOpacity] = useState(60)
  const [watermarkFont, setWatermarkFont] = useState("Inter")
  const [isPatternMode, setIsPatternMode] = useState(false)
  const [showWatermark, setShowWatermark] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFilterChange = (filterId: string, intensity: number) => {
    setFilters((prev) => prev.map((f) => (f.id === filterId ? { ...f, intensity } : f)))
    if (intensity > 0) {
      setActiveFilters((prev) => new Set(prev).add(filterId))
    } else {
      setActiveFilters((prev) => {
        const newSet = new Set(prev)
        newSet.delete(filterId)
        return newSet
      })
    }
  }

  const resetFilters = () => {
    setFilters((prev) => prev.map((f) => ({ ...f, intensity: 0 })))
    setActiveFilters(new Set())
  }

  const getFilterStyle = () => {
    let filterString = ""
    filters.forEach((filter) => {
      if (filter.intensity > 0) {
        switch (filter.id) {
          case "grayscale":
            filterString += `grayscale(${filter.intensity}%) `
            break
          case "contrast":
            filterString += `contrast(${100 + filter.intensity}%) `
            break
          case "sepia":
            filterString += `sepia(${filter.intensity}%) `
            break
          case "brightness":
            filterString += `brightness(${100 + filter.intensity}%) `
            break
          case "saturation":
            filterString += `saturate(${100 + filter.intensity}%) `
            break
          case "vintage":
            filterString += `sepia(${filter.intensity * 0.4}%) contrast(${100 + filter.intensity * 0.3}%) `
            break
          case "blur":
            filterString += `blur(${filter.intensity / 5}px) `
            break
          case "duotone":
            filterString += `hue-rotate(${filter.intensity * 1.8}deg) saturate(${100 + filter.intensity}%) `
            break
          case "vignette":
            filterString += `brightness(${100 - filter.intensity * 0.3}%) `
            break
          case "sharpen":
            filterString += `contrast(${100 + filter.intensity * 1.5}%) `
            break
          case "warm":
            filterString += `sepia(${filter.intensity * 0.3}%) saturate(${100 + filter.intensity * 0.5}%) `
            break
          case "cool":
            filterString += `hue-rotate(${filter.intensity * 1.2}deg) saturate(${100 + filter.intensity * 0.3}%) `
            break
          case "hdr":
            filterString += `contrast(${100 + filter.intensity * 0.8}%) saturate(${100 + filter.intensity * 0.6}%) brightness(${100 + filter.intensity * 0.2}%) `
            break
          case "ai-enhance":
            filterString += `contrast(${100 + filter.intensity * 0.5}%) saturate(${100 + filter.intensity * 0.4}%) brightness(${100 + filter.intensity * 0.15}%) `
            break
          case "chromatic":
            filterString += `hue-rotate(${filter.intensity * 0.5}deg) `
            break
        }
      }
    })
    return filterString
  }

  const handleCreateWatermark = () => {
    if (!watermarkText.trim()) return
    const newWatermark: Watermark = {
      id: Date.now().toString(),
      text: watermarkText,
      position: watermarkPosition,
      opacity: watermarkOpacity,
      font: watermarkFont,
    }
    setWatermarks((prev) => [...prev, newWatermark])
    setWatermarkText("")
  }

  const handleSelectWatermark = (watermark: Watermark) => {
    setSelectedWatermark(watermark)
    setWatermarkText(watermark.text)
    setWatermarkPosition(watermark.position)
    setWatermarkOpacity(watermark.opacity)
    setWatermarkFont(watermark.font)
  }

  const handleDeleteWatermark = (id: string) => {
    setWatermarks((prev) => prev.filter((w) => w.id !== id))
    if (selectedWatermark?.id === id) {
      setSelectedWatermark(null)
    }
  }

  const handleApplyWatermark = () => {
    if (!watermarkText.trim()) return
    setShowWatermark(true)
  }

  const handleRemoveWatermark = () => {
    setShowWatermark(false)
  }

  const getWatermarkPositionStyle = () => {
    const baseStyle: React.CSSProperties = {
      position: "absolute",
      color: "white",
      fontFamily: watermarkFont,
      fontSize: isPatternMode ? "16px" : "24px",
      opacity: watermarkOpacity / 100,
      pointerEvents: "none",
      textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
    }

    if (isPatternMode) {
      return {
        ...baseStyle,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }
    }

    switch (watermarkPosition) {
      case "top-left":
        return { ...baseStyle, top: "20px", left: "20px" }
      case "top-right":
        return { ...baseStyle, top: "20px", right: "20px" }
      case "center":
        return { ...baseStyle, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
      case "bottom-left":
        return { ...baseStyle, bottom: "20px", left: "20px" }
      case "bottom-right":
        return { ...baseStyle, bottom: "20px", right: "20px" }
      default:
        return { ...baseStyle, bottom: "20px", right: "20px" }
    }
  }

  const renderPatternWatermark = () => {
    const rows = 6
    const cols = 4
    const watermarks = []
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        watermarks.push(
          <div
            key={`${i}-${j}`}
            style={{
              position: "absolute",
              top: `${(i * 100) / rows + 10}%`,
              left: `${(j * 100) / cols + 10}%`,
              transform: "translate(-50%, -50%) rotate(-45deg)",
              color: "white",
              fontFamily: watermarkFont,
              fontSize: "16px",
              opacity: watermarkOpacity / 100,
              pointerEvents: "none",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              whiteSpace: "nowrap",
            }}
          >
            {watermarkText}
          </div>,
        )
      }
    }
    return watermarks
  }

  const hasAccessToFilter = (tier: "Free" | "Bronze" | "Silver" | "Gold") => {
    if (tier === "Free") return true
    if (tier === "Bronze") return hasBronzeAccess
    if (tier === "Silver") return hasSilverAccess
    if (tier === "Gold") return hasGoldAccess
    return false
  }

  const filtersByTier = {
    Free: filters.filter((f) => f.tier === "Free"),
    Bronze: filters.filter((f) => f.tier === "Bronze"),
    Silver: filters.filter((f) => f.tier === "Silver"),
    Gold: filters.filter((f) => f.tier === "Gold"),
  }

  const getBackgroundBlurIntensity = () => {
    const bgBlur = filters.find((f) => f.id === "background-blur")
    return bgBlur?.intensity || 0
  }

  const getBokehIntensity = () => {
    const bokeh = filters.find((f) => f.id === "bokeh")
    return bokeh?.intensity || 0
  }

  const hasDepthEffect = getBackgroundBlurIntensity() > 0 || getBokehIntensity() > 0

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-xl text-foreground">ImagePro</span>
          </Link>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-card">
              {plan} Plan
            </Badge>
            {!isPremium && (
              <Button size="sm" onClick={upgradeToPremium} className="bg-gradient-to-r from-primary to-teal-500">
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Premium
              </Button>
            )}
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          {/* Main Editor Area */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Image Editor</h1>
                <p className="text-muted-foreground">Upload an image and apply professional filters</p>
              </div>
              {selectedImage && (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={resetFilters}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                  <Button size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              )}
            </div>

            {/* Canvas Area */}
            <Card className="bg-card border-border p-8">
              {!selectedImage ? (
                <div className="flex flex-col items-center justify-center min-h-[500px] border-2 border-dashed border-border rounded-lg">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-card-foreground">Upload an image</h3>
                  <p className="text-muted-foreground mb-6">Drag and drop or click to browse</p>
                  <label htmlFor="image-upload">
                    <Button asChild>
                      <span>Choose File</span>
                    </Button>
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center min-h-[500px] relative">
                  {hasDepthEffect ? (
                    <div className="relative max-w-full max-h-[500px]">
                      {/* Blurred background layer */}
                      <img
                        src={selectedImage || "/placeholder.svg"}
                        alt="Blurred background"
                        className="max-w-full max-h-[500px] rounded-lg"
                        style={{
                          filter: `${getFilterStyle()} blur(${Math.max(getBackgroundBlurIntensity(), getBokehIntensity()) / 4}px) ${getBokehIntensity() > 0 ? `brightness(${100 + getBokehIntensity() * 0.2}%)` : ""}`,
                        }}
                      />
                      {/* Sharp center layer with radial mask */}
                      <img
                        src={selectedImage || "/placeholder.svg"}
                        alt="Sharp center"
                        className="absolute inset-0 max-w-full max-h-[500px] rounded-lg"
                        style={{
                          filter: getFilterStyle(),
                          maskImage: `radial-gradient(ellipse 40% 50% at center, black ${100 - Math.max(getBackgroundBlurIntensity(), getBokehIntensity())}%, transparent 100%)`,
                          WebkitMaskImage: `radial-gradient(ellipse 40% 50% at center, black ${100 - Math.max(getBackgroundBlurIntensity(), getBokehIntensity())}%, transparent 100%)`,
                        }}
                      />
                    </div>
                  ) : (
                    <img
                      src={selectedImage || "/placeholder.svg"}
                      alt="Uploaded"
                      className="max-w-full max-h-[500px] rounded-lg"
                      style={{ filter: getFilterStyle() }}
                    />
                  )}
                  {showWatermark && watermarkText && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {isPatternMode ? (
                        <div className="relative w-full h-full">{renderPatternWatermark()}</div>
                      ) : (
                        <div style={getWatermarkPositionStyle()}>{watermarkText}</div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </Card>

            {/* Version History */}
            {selectedImage && (
              <Card className="bg-card border-border p-6">
                <h3 className="text-lg font-semibold mb-4 text-card-foreground">Version History</h3>
                <div className="flex items-center gap-4 overflow-x-auto pb-2">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-muted rounded-lg border-2 border-primary flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Current</span>
                    </div>
                    <p className="text-xs text-center mt-2 text-muted-foreground">Just now</p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-muted rounded-lg border border-border"></div>
                    <p className="text-xs text-center mt-2 text-muted-foreground">5 min ago</p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-muted rounded-lg border border-border"></div>
                    <p className="text-xs text-center mt-2 text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar - Filters */}
          <div className="space-y-6">
            <Card className="bg-card border-border p-6">
              <Tabs defaultValue="filters" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="filters">Filters</TabsTrigger>
                  <TabsTrigger value="watermark">Watermark</TabsTrigger>
                </TabsList>

                <TabsContent value="filters" className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-card-foreground">Available Filters</h3>
                      {activeFilters.size > 0 && <Badge variant="secondary">{activeFilters.size} active</Badge>}
                    </div>

                    <div className="space-y-8">
                      {/* Free Tier */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-muted text-muted-foreground">
                            Free
                          </Badge>
                        </div>
                        <div className="space-y-6">
                          {filtersByTier.Free.map((filter) => (
                            <div key={filter.id} className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-card-foreground">{filter.name}</span>
                                <span className="text-xs text-muted-foreground">{filter.intensity}%</span>
                              </div>
                              <p className="text-xs text-muted-foreground">{filter.description}</p>
                              <Slider
                                value={[filter.intensity]}
                                onValueChange={(value) => handleFilterChange(filter.id, value[0])}
                                max={100}
                                step={1}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bronze Tier */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                            Bronze
                          </Badge>
                        </div>
                        <div className="space-y-6">
                          {filtersByTier.Bronze.map((filter) => {
                            const isLocked = !hasAccessToFilter(filter.tier)
                            return (
                              <div key={filter.id} className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-card-foreground">{filter.name}</span>
                                    {isLocked && <Lock className="w-3 h-3 text-muted-foreground" />}
                                  </div>
                                  <span className="text-xs text-muted-foreground">{filter.intensity}%</span>
                                </div>
                                <p className="text-xs text-muted-foreground">{filter.description}</p>
                                <Slider
                                  value={[filter.intensity]}
                                  onValueChange={(value) => handleFilterChange(filter.id, value[0])}
                                  max={100}
                                  step={1}
                                  disabled={isLocked}
                                  className={isLocked ? "opacity-50" : ""}
                                />
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      {/* Silver Tier */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-slate-400/10 text-slate-400 border-slate-400/20">
                            Silver
                          </Badge>
                        </div>
                        <div className="space-y-6">
                          {filtersByTier.Silver.map((filter) => {
                            const isLocked = !hasAccessToFilter(filter.tier)
                            return (
                              <div key={filter.id} className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-card-foreground">{filter.name}</span>
                                    {isLocked && <Lock className="w-3 h-3 text-muted-foreground" />}
                                  </div>
                                  <span className="text-xs text-muted-foreground">{filter.intensity}%</span>
                                </div>
                                <p className="text-xs text-muted-foreground">{filter.description}</p>
                                <Slider
                                  value={[filter.intensity]}
                                  onValueChange={(value) => handleFilterChange(filter.id, value[0])}
                                  max={100}
                                  step={1}
                                  disabled={isLocked}
                                  className={isLocked ? "opacity-50" : ""}
                                />
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      {/* Gold Tier */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                            Gold
                          </Badge>
                        </div>
                        <div className="space-y-6">
                          {filtersByTier.Gold.map((filter) => {
                            const isLocked = !hasAccessToFilter(filter.tier)
                            return (
                              <div key={filter.id} className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-card-foreground">{filter.name}</span>
                                    {isLocked && <Lock className="w-3 h-3 text-muted-foreground" />}
                                  </div>
                                  <span className="text-xs text-muted-foreground">{filter.intensity}%</span>
                                </div>
                                <p className="text-xs text-muted-foreground">{filter.description}</p>
                                <Slider
                                  value={[filter.intensity]}
                                  onValueChange={(value) => handleFilterChange(filter.id, value[0])}
                                  max={100}
                                  step={1}
                                  disabled={isLocked}
                                  className={isLocked ? "opacity-50" : ""}
                                />
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    {!isPremium && (
                      <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-card-foreground mb-1">Unlock Premium Filters</p>
                            <p className="text-xs text-muted-foreground mb-3">
                              Upgrade to access advanced filters like duotone, HDR, AI enhancement, and more.
                            </p>
                            <Button size="sm" className="w-full" onClick={upgradeToPremium}>
                              <Crown className="w-4 h-4 mr-2" />
                              Upgrade Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="watermark" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-card-foreground">Watermark Editor</h3>
                    {isPremium ? (
                      <div className="space-y-6">
                        {/* Saved Watermarks */}
                        {watermarks.length > 0 && (
                          <div className="space-y-3">
                            <Label className="text-sm font-medium">Saved Watermarks</Label>
                            <div className="space-y-2">
                              {watermarks.map((wm) => (
                                <div
                                  key={wm.id}
                                  className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border hover:border-primary transition-colors cursor-pointer"
                                  onClick={() => handleSelectWatermark(wm)}
                                >
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-card-foreground truncate">{wm.text}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {wm.position} • {wm.opacity}% opacity
                                    </p>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleDeleteWatermark(wm.id)
                                    }}
                                  >
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Watermark Text */}
                        <div className="space-y-2">
                          <Label htmlFor="watermark-text" className="text-sm font-medium">
                            Watermark Text
                          </Label>
                          <Input
                            id="watermark-text"
                            placeholder="Enter watermark text..."
                            value={watermarkText}
                            onChange={(e) => setWatermarkText(e.target.value)}
                          />
                        </div>

                        {/* Position */}
                        <div className="space-y-2">
                          <Label htmlFor="position" className="text-sm font-medium">
                            Position
                          </Label>
                          <Select value={watermarkPosition} onValueChange={setWatermarkPosition}>
                            <SelectTrigger id="position">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="top-left">Top Left</SelectItem>
                              <SelectItem value="top-right">Top Right</SelectItem>
                              <SelectItem value="center">Center</SelectItem>
                              <SelectItem value="bottom-left">Bottom Left</SelectItem>
                              <SelectItem value="bottom-right">Bottom Right</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Opacity */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium">Opacity</Label>
                            <span className="text-xs text-muted-foreground">{watermarkOpacity}%</span>
                          </div>
                          <Slider
                            value={[watermarkOpacity]}
                            onValueChange={(value) => setWatermarkOpacity(value[0])}
                            max={100}
                            step={1}
                          />
                        </div>

                        {/* Font */}
                        <div className="space-y-2">
                          <Label htmlFor="font" className="text-sm font-medium">
                            Font
                          </Label>
                          <Select value={watermarkFont} onValueChange={setWatermarkFont}>
                            <SelectTrigger id="font">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Inter">Inter</SelectItem>
                              <SelectItem value="Arial">Arial</SelectItem>
                              <SelectItem value="Georgia">Georgia</SelectItem>
                              <SelectItem value="Courier New">Courier New</SelectItem>
                              <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Pattern Mode */}
                        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="space-y-0.5">
                            <Label htmlFor="pattern-mode" className="text-sm font-medium cursor-pointer">
                              Pattern Mode
                            </Label>
                            <p className="text-xs text-muted-foreground">Repeat watermark across image</p>
                          </div>
                          <Switch id="pattern-mode" checked={isPatternMode} onCheckedChange={setIsPatternMode} />
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-2">
                          <Button className="w-full" onClick={handleApplyWatermark} disabled={!watermarkText.trim()}>
                            Apply Watermark
                          </Button>
                          {showWatermark && (
                            <Button variant="outline" className="w-full bg-transparent" onClick={handleRemoveWatermark}>
                              Remove Watermark
                            </Button>
                          )}
                          <Button
                            variant="secondary"
                            className="w-full"
                            onClick={handleCreateWatermark}
                            disabled={!watermarkText.trim()}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Save as Preset
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 bg-muted/50 border border-border rounded-lg text-center">
                        <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                        <p className="text-sm font-medium text-card-foreground mb-2">Watermarks Available in Premium</p>
                        <p className="text-xs text-muted-foreground mb-4">Protect your images with custom watermarks</p>
                        <Button size="sm" onClick={upgradeToPremium}>
                          <Crown className="w-4 h-4 mr-2" />
                          Upgrade Plan
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Usage Stats */}
            <Card className="bg-card border-border p-6">
              <h3 className="text-sm font-semibold mb-4 text-card-foreground">Monthly Usage</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">Images Edited</span>
                    <span className="text-xs font-medium text-card-foreground">
                      3 / {isPremium ? "Unlimited" : "10"}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: isPremium ? "5%" : "30%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">Storage Used</span>
                    <span className="text-xs font-medium text-card-foreground">
                      45 / {isPremium ? "16384" : "200"} MB
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: isPremium ? "0.3%" : "22.5%" }}></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
