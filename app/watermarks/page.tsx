"use client"

import { useState } from "react"
import { useUser } from "@/lib/user-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ImageIcon, Plus, Edit, Trash2, Copy, Lock, Crown } from "lucide-react"
import Link from "next/link"

type Watermark = {
  id: number
  presetName: string
  text: string
  position: string
  opacity: number
  font: string
  createdAt: string
}

export default function WatermarksPage() {
  const { plan, upgradeToPremium, isPremium } = useUser()
  const [watermarks, setWatermarks] = useState<Watermark[]>([
    {
      id: 1,
      presetName: "Default Brand",
      text: "© ImagePro 2025",
      position: "bottom-right",
      opacity: 60,
      font: "Inter",
      createdAt: "2025-01-01",
    },
    {
      id: 2,
      presetName: "Subtle Mark",
      text: "ImagePro",
      position: "bottom-left",
      opacity: 30,
      font: "Geist",
      createdAt: "2025-01-05",
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingWatermark, setEditingWatermark] = useState<Watermark | null>(null)
  const [formData, setFormData] = useState({
    presetName: "",
    text: "",
    position: "bottom-right",
    opacity: 60,
    font: "Inter",
  })

  const handleCreate = () => {
    setEditingWatermark(null)
    setFormData({
      presetName: "",
      text: "",
      position: "bottom-right",
      opacity: 60,
      font: "Inter",
    })
    setIsDialogOpen(true)
  }

  const handleEdit = (watermark: Watermark) => {
    setEditingWatermark(watermark)
    setFormData({
      presetName: watermark.presetName,
      text: watermark.text,
      position: watermark.position,
      opacity: watermark.opacity,
      font: watermark.font,
    })
    setIsDialogOpen(true)
  }

  const handleSave = () => {
    if (editingWatermark) {
      setWatermarks((prev) => prev.map((w) => (w.id === editingWatermark.id ? { ...w, ...formData } : w)))
    } else {
      const newWatermark: Watermark = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setWatermarks((prev) => [...prev, newWatermark])
    }
    setIsDialogOpen(false)
  }

  const handleDelete = (id: number) => {
    setWatermarks((prev) => prev.filter((w) => w.id !== id))
  }

  const handleDuplicate = (watermark: Watermark) => {
    const newWatermark: Watermark = {
      ...watermark,
      id: Date.now(),
      presetName: `${watermark.presetName} (Copy)`,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setWatermarks((prev) => [...prev, newWatermark])
  }

  const getPositionLabel = (position: string) => {
    const labels: Record<string, string> = {
      "top-left": "Top Left",
      "top-right": "Top Right",
      center: "Center",
      "bottom-left": "Bottom Left",
      "bottom-right": "Bottom Right",
    }
    return labels[position] || position
  }

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
            {!isPremium && (
              <Button size="sm" onClick={upgradeToPremium} className="bg-gradient-to-r from-primary to-teal-500">
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Premium
              </Button>
            )}
            <Button variant="ghost" size="sm" asChild>
              <Link href="/editor">Editor</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Watermark Presets</h1>
            <p className="text-muted-foreground">Create and manage custom watermark presets for your images</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleCreate} disabled={!isPremium}>
                <Plus className="w-4 h-4 mr-2" />
                New Preset
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="text-card-foreground">
                  {editingWatermark ? "Edit Watermark Preset" : "Create Watermark Preset"}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Configure your watermark settings. You can apply this preset to any image.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="presetName" className="text-card-foreground">
                    Preset Name
                  </Label>
                  <Input
                    id="presetName"
                    placeholder="e.g., Brand Watermark"
                    value={formData.presetName}
                    onChange={(e) => setFormData({ ...formData, presetName: e.target.value })}
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="text" className="text-card-foreground">
                    Watermark Text
                  </Label>
                  <Input
                    id="text"
                    placeholder="e.g., © Your Brand 2025"
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    maxLength={140}
                    className="bg-background border-border text-foreground"
                  />
                  <p className="text-xs text-muted-foreground">{formData.text.length} / 140 characters</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position" className="text-card-foreground">
                    Position
                  </Label>
                  <Select
                    value={formData.position}
                    onValueChange={(value) => setFormData({ ...formData, position: value })}
                  >
                    <SelectTrigger className="bg-background border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="top-left">Top Left</SelectItem>
                      <SelectItem value="top-right">Top Right</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="bottom-left">Bottom Left</SelectItem>
                      <SelectItem value="bottom-right">Bottom Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="opacity" className="text-card-foreground">
                      Opacity
                    </Label>
                    <span className="text-sm text-muted-foreground">{formData.opacity}%</span>
                  </div>
                  <Slider
                    id="opacity"
                    value={[formData.opacity]}
                    onValueChange={(value) => setFormData({ ...formData, opacity: value[0] })}
                    max={100}
                    step={1}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="font" className="text-card-foreground">
                    Font
                  </Label>
                  <Select value={formData.font} onValueChange={(value) => setFormData({ ...formData, font: value })}>
                    <SelectTrigger className="bg-background border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="Geist">Geist</SelectItem>
                      <SelectItem value="Arial">Arial</SelectItem>
                      <SelectItem value="Helvetica">Helvetica</SelectItem>
                      <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Preview */}
                <div className="space-y-2">
                  <Label className="text-card-foreground">Preview</Label>
                  <div className="relative w-full h-48 bg-muted rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 bg-muted-foreground/20 rounded-lg"></div>
                    </div>
                    <div
                      className={`absolute ${
                        formData.position === "top-left"
                          ? "top-4 left-4"
                          : formData.position === "top-right"
                            ? "top-4 right-4"
                            : formData.position === "center"
                              ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                              : formData.position === "bottom-left"
                                ? "bottom-4 left-4"
                                : "bottom-4 right-4"
                      }`}
                      style={{
                        opacity: formData.opacity / 100,
                        fontFamily: formData.font,
                      }}
                    >
                      <span className="text-sm text-foreground font-medium px-2 py-1 bg-background/50 rounded">
                        {formData.text || "Watermark Text"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={!formData.presetName || !formData.text}>
                  {editingWatermark ? "Save Changes" : "Create Preset"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Plan Notice */}
        {!isPremium ? (
          <Card className="bg-card border-border p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-card-foreground mb-2">Premium Plan Required</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Watermark presets are available for premium subscribers. Upgrade your plan to protect your images with
                  custom watermarks.
                </p>
                <div className="flex items-center gap-3">
                  <Badge className="bg-primary/10 text-primary border-primary/20">Current: {plan} Plan</Badge>
                  <Button size="sm" onClick={upgradeToPremium}>
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade to Premium
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="bg-card border-border p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <Crown className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-card-foreground mb-2">Premium Features Unlocked</h3>
                <p className="text-sm text-muted-foreground">
                  You now have access to all watermark features. Create unlimited presets and protect your images.
                </p>
                <Badge className="bg-primary/10 text-primary border-primary/20 mt-3">Current: {plan} Plan</Badge>
              </div>
            </div>
          </Card>
        )}

        {/* Watermarks Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {watermarks.map((watermark) => (
            <Card key={watermark.id} className="bg-card border-border overflow-hidden">
              {/* Preview */}
              <div className="relative h-48 bg-muted">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-muted-foreground/20 rounded-lg"></div>
                </div>
                <div
                  className={`absolute ${
                    watermark.position === "top-left"
                      ? "top-4 left-4"
                      : watermark.position === "top-right"
                        ? "top-4 right-4"
                        : watermark.position === "center"
                          ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          : watermark.position === "bottom-left"
                            ? "bottom-4 left-4"
                            : "bottom-4 right-4"
                  }`}
                  style={{
                    opacity: watermark.opacity / 100,
                    fontFamily: watermark.font,
                  }}
                >
                  <span className="text-sm text-foreground font-medium px-2 py-1 bg-background/50 rounded">
                    {watermark.text}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-2">{watermark.presetName}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Position</span>
                    <span className="text-card-foreground">{getPositionLabel(watermark.position)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Opacity</span>
                    <span className="text-card-foreground">{watermark.opacity}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Font</span>
                    <span className="text-card-foreground">{watermark.font}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Created</span>
                    <span className="text-card-foreground">{watermark.createdAt}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => handleEdit(watermark)}
                    disabled={!isPremium}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDuplicate(watermark)} disabled={!isPremium}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(watermark.id)} disabled={!isPremium}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {watermarks.length === 0 && (
          <Card className="bg-card border-border p-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">No watermark presets yet</h3>
              <p className="text-muted-foreground mb-6">Create your first watermark preset to get started</p>
              <Button onClick={handleCreate} disabled={!isPremium}>
                <Plus className="w-4 h-4 mr-2" />
                Create Preset
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
