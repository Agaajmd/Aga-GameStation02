"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, X, ImageIcon } from "lucide-react"
import { useToast } from "@/components/providers/toast-provider"

interface FileUploadProps {
  file: File | null
  onFileSelect: (file: File | null) => void
}

export function FileUpload({ file, onFileSelect }: FileUploadProps) {
  const { showError, showSuccess } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileSelect = (selectedFile: File) => {
    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"]
    if (!allowedTypes.includes(selectedFile.type)) {
      showError("Format file tidak didukung", "Hanya file JPG, JPEG, dan PNG yang diperbolehkan")
      return
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (selectedFile.size > maxSize) {
      showError("File terlalu besar", "Ukuran file maksimal 5MB")
      return
    }

    onFileSelect(selectedFile)

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(selectedFile)

    showSuccess("File berhasil dipilih", "Bukti pembayaran siap diupload")
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      handleFileSelect(droppedFile)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const removeFile = () => {
    onFileSelect(null)
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <Card
          className={`border-2 border-dashed transition-all duration-200 cursor-pointer ${
            isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 bg-card"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <CardContent className="p-6 sm:p-8 text-center">
            <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
            <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Upload Bukti Pembayaran</h4>
            <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">Drag & drop file atau klik untuk memilih</p>
            <p className="text-xs text-muted-foreground">Format: JPG, JPEG, PNG • Maksimal 5MB</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-card border-border">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-start gap-3 sm:gap-4">
              {/* Preview */}
              <div className="flex-shrink-0">
                {preview ? (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-border">
                    <img
                      src={preview || "/placeholder.svg"}
                      alt="Preview bukti pembayaran"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-muted flex items-center justify-center border border-border">
                    <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground truncate text-sm sm:text-base">{file.name}</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs sm:text-sm text-green-600 dark:text-green-400">Siap diupload</span>
                </div>
                
                {/* Action Buttons */}
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs sm:text-sm h-7 px-2"
                  >
                    Ganti File
                  </Button>
                </div>
              </div>

              {/* Remove Button */}
              <Button
                variant="outline"  
                size="sm"
                onClick={removeFile}
                className="text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20 flex-shrink-0 h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Full Preview */}
            {preview && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium text-foreground mb-2">Preview Bukti Pembayaran:</p>
                <div className="max-w-sm mx-auto">
                  <img
                    src={preview || "/placeholder.svg"}
                    alt="Preview bukti pembayaran"
                    className="w-full rounded-lg border border-border shadow-sm"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0]
          if (selectedFile) {
            handleFileSelect(selectedFile)
          }
        }}
        className="hidden"
      />
    </div>
  )
}
