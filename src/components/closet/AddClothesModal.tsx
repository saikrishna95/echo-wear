import React, { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Camera, Upload, Link as LinkIcon, X, Plus, ChevronRight, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { removeBackground } from "@/utils/imageProcessing";

interface ImageData {
  url: string;
  file?: File;
}

interface AddClothesModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (clothingItem: ClothingItem) => void;
  category: string;
}

export interface ClothingItem {
  id: string;
  name: string;
  category: string;
  color: string;
  type: string;
  pattern: string;
  images: {
    front: string;
    back: string;
    side: string;
  };
}

const AddClothesModal: React.FC<AddClothesModalProps> = ({ open, onClose, onSave, category }) => {
  const [activeView, setActiveView] = useState<"front" | "back" | "side">("front");
  const [addMethod, setAddMethod] = useState<"capture" | "upload" | "link">("capture");
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [type, setType] = useState("Casual");
  const [pattern, setPattern] = useState("");
  const [images, setImages] = useState<{
    front: ImageData | null;
    back: ImageData | null;
    side: ImageData | null;
  }>({
    front: null,
    back: null,
    side: null,
  });
  const [processingImage, setProcessingImage] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const [linkUrl, setLinkUrl] = useState("");

  const handleCapture = async () => {
    if (cameraRef.current) {
      cameraRef.current.click();
    }
  };

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const processImage = async (file: File, view: "front" | "back" | "side") => {
    setProcessingImage(true);
    try {
      const imageUrl = URL.createObjectURL(file);
      
      const processedImageUrl = await removeBackground(imageUrl);
      
      setImages({
        ...images,
        [view]: { url: processedImageUrl, file },
      });
      
      URL.revokeObjectURL(imageUrl);
    } catch (error) {
      console.error("Error processing image:", error);
      toast({
        title: "Image Processing Failed",
        description: "Could not process the image. Using original image instead.",
        variant: "destructive",
      });
      
      const imageUrl = URL.createObjectURL(file);
      setImages({
        ...images,
        [view]: { url: imageUrl, file },
      });
    } finally {
      setProcessingImage(false);
    }
  };

  const handleCameraCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await processImage(file, activeView);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await processImage(file, activeView);
    }
  };

  const handleLinkSubmit = async () => {
    if (linkUrl.trim()) {
      setProcessingImage(true);
      try {
        const processedImageUrl = await removeBackground(linkUrl);
        setImages({
          ...images,
          [activeView]: { url: processedImageUrl },
        });
      } catch (error) {
        toast({
          title: "Invalid URL",
          description: "Could not process the image URL",
          variant: "destructive",
        });
        setImages({
          ...images,
          [activeView]: { url: linkUrl },
        });
      } finally {
        setProcessingImage(false);
        setLinkUrl("");
      }
    } else {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid image URL",
        variant: "destructive",
      });
    }
  };

  const handleRemoveImage = (view: "front" | "back" | "side") => {
    setImages({
      ...images,
      [view]: null,
    });
  };

  const handleSave = () => {
    if (!name.trim()) {
      toast({
        title: "Name Required",
        description: "Please give your clothing item a name",
        variant: "destructive",
      });
      return;
    }

    if (!images.front) {
      toast({
        title: "Front Image Required",
        description: "Please add at least a front view image",
        variant: "destructive",
      });
      return;
    }

    const newItem: ClothingItem = {
      id: Date.now().toString(),
      name: name.trim(),
      category,
      color: color || "Unknown",
      type: type || "Casual",
      pattern: pattern || "",
      ...(category === 'tops' && { 
        sleevelength: "full", 
        neckline: "round"
      }),
      ...(category === 'bottoms' && { 
        fit: "regular"
      }),
      ...(category === 'shoes' && { 
        style: "casual"
      }),
      images: {
        front: images.front.url,
        back: images.back?.url || images.front.url,
        side: images.side?.url || images.front.url,
      },
    };

    onSave(newItem);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setName("");
    setColor("");
    setType("Casual");
    setPattern("");
    setImages({
      front: null,
      back: null,
      side: null,
    });
    setActiveView("front");
    setAddMethod("capture");
    setLinkUrl("");
  };

  const getViewLabel = (view: "front" | "back" | "side") => {
    const labels = {
      front: "Front View",
      back: "Back View",
      side: "Side View",
    };
    return labels[view];
  };

  const getCategorySingularName = () => {
    if (!category) return "Item";
    return category.charAt(0).toUpperCase() + category.slice(1, -1);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Add New {getCategorySingularName()}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="itemName">Name</Label>
              <Input 
                id="itemName" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder={`e.g. Blue ${getCategorySingularName()}`}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="itemColor">Color</Label>
              <Input 
                id="itemColor" 
                value={color} 
                onChange={(e) => setColor(e.target.value)} 
                placeholder="e.g. Blue"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="itemType">Style</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="itemType">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Casual">Casual</SelectItem>
                  <SelectItem value="Formal">Formal</SelectItem>
                  <SelectItem value="Sporty">Sporty</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Party">Party</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="itemPattern">Pattern</Label>
              <Input 
                id="itemPattern" 
                value={pattern} 
                onChange={(e) => setPattern(e.target.value)} 
                placeholder="e.g. Striped, Floral"
              />
            </div>
          </div>

          <div className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Images</h3>
              <div className="flex gap-2">
                {images.front && (
                  <button
                    onClick={() => setActiveView("front")}
                    className={`text-xs px-2 py-1 rounded-full ${
                      activeView === "front" 
                        ? "bg-fashion-amber/20 text-fashion-amber" 
                        : "bg-gray-100"
                    }`}
                  >
                    Front
                  </button>
                )}
                {images.back && (
                  <button
                    onClick={() => setActiveView("back")}
                    className={`text-xs px-2 py-1 rounded-full ${
                      activeView === "back" 
                        ? "bg-fashion-amber/20 text-fashion-amber" 
                        : "bg-gray-100"
                    }`}
                  >
                    Back
                  </button>
                )}
                {images.side && (
                  <button
                    onClick={() => setActiveView("side")}
                    className={`text-xs px-2 py-1 rounded-full ${
                      activeView === "side" 
                        ? "bg-fashion-amber/20 text-fashion-amber" 
                        : "bg-gray-100"
                    }`}
                  >
                    Side
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div 
                className={`relative border rounded-lg overflow-hidden cursor-pointer hover:border-fashion-amber transition-colors ${images.front ? 'border-fashion-amber/30' : 'border-dashed border-gray-300'}`}
                onClick={() => setActiveView("front")}
                style={{ aspectRatio: "3/4" }}
              >
                <div className="w-full h-full bg-gray-50">
                  {images.front ? (
                    <>
                      <img 
                        src={images.front.url} 
                        alt="Front view" 
                        className="w-full h-full object-cover" 
                      />
                      <button 
                        className="absolute top-1 right-1 bg-white/80 p-1 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage("front");
                        }}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <Plus className="h-4 w-4 text-gray-400" />
                      <span className="text-xs text-gray-500 mt-1">Front</span>
                    </div>
                  )}
                </div>
              </div>

              <div 
                className={`relative border rounded-lg overflow-hidden cursor-pointer hover:border-fashion-amber transition-colors ${images.back ? 'border-fashion-amber/30' : 'border-dashed border-gray-300'}`}
                onClick={() => setActiveView("back")}
                style={{ aspectRatio: "3/4" }}
              >
                <div className="w-full h-full bg-gray-50">
                  {images.back ? (
                    <>
                      <img 
                        src={images.back.url} 
                        alt="Back view" 
                        className="w-full h-full object-cover" 
                      />
                      <button 
                        className="absolute top-1 right-1 bg-white/80 p-1 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage("back");
                        }}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <Plus className="h-4 w-4 text-gray-400" />
                      <span className="text-xs text-gray-500 mt-1">Back</span>
                    </div>
                  )}
                </div>
              </div>

              <div 
                className={`relative border rounded-lg overflow-hidden cursor-pointer hover:border-fashion-amber transition-colors ${images.side ? 'border-fashion-amber/30' : 'border-dashed border-gray-300'}`}
                onClick={() => setActiveView("side")}
                style={{ aspectRatio: "3/4" }}
              >
                <div className="w-full h-full bg-gray-50">
                  {images.side ? (
                    <>
                      <img 
                        src={images.side.url} 
                        alt="Side view" 
                        className="w-full h-full object-cover" 
                      />
                      <button 
                        className="absolute top-1 right-1 bg-white/80 p-1 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage("side");
                        }}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <Plus className="h-4 w-4 text-gray-400" />
                      <span className="text-xs text-gray-500 mt-1">Side</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <p className="text-sm font-medium">{getViewLabel(activeView)}</p>

              <Tabs value={addMethod} onValueChange={(value) => setAddMethod(value as "capture" | "upload" | "link")}>
                <TabsList className="w-full grid grid-cols-3 mb-2">
                  <TabsTrigger value="capture">
                    <Camera className="h-3.5 w-3.5 mr-1" />
                    Capture
                  </TabsTrigger>
                  <TabsTrigger value="upload">
                    <Upload className="h-3.5 w-3.5 mr-1" />
                    Upload
                  </TabsTrigger>
                  <TabsTrigger value="link">
                    <LinkIcon className="h-3.5 w-3.5 mr-1" />
                    URL
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="capture" className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    ref={cameraRef}
                    onChange={handleCameraCapture}
                    className="hidden"
                  />
                  <Button 
                    onClick={handleCapture} 
                    variant="outline" 
                    className="w-full" 
                    size="sm"
                    disabled={processingImage}
                  >
                    {processingImage ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Camera className="h-3.5 w-3.5 mr-2" />
                        Take Photo
                      </>
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="upload" className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button 
                    onClick={handleFileUpload} 
                    variant="outline" 
                    className="w-full" 
                    size="sm"
                    disabled={processingImage}
                  >
                    {processingImage ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Upload className="h-3.5 w-3.5 mr-2" />
                        Choose File
                      </>
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="link" className="mt-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Paste image URL"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      size={12}
                      disabled={processingImage}
                    />
                    <Button 
                      onClick={handleLinkSubmit} 
                      type="button" 
                      size="sm"
                      disabled={processingImage}
                    >
                      {processingImage ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        "Add"
                      )}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        <DialogFooter className="flex space-x-2 justify-end">
          <Button variant="outline" onClick={onClose} size="sm">Cancel</Button>
          <Button 
            onClick={handleSave} 
            className="bg-fashion-amber hover:bg-fashion-amber/90 text-white" 
            size="sm"
            disabled={processingImage}
          >
            Save {getCategorySingularName()}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddClothesModal;
