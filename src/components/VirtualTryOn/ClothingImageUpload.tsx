
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, Image as ImageIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { removeBackground } from '@/utils/imageProcessing';

interface ClothingImageUploadProps {
  onImageUploaded: (imageUrl: string, type: string) => void;
  clothingType: string;
}

const ClothingImageUpload: React.FC<ClothingImageUploadProps> = ({ 
  onImageUploaded,
  clothingType
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive"
      });
      return;
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsUploading(true);
      
      // Create an object URL for the file
      const imageUrl = URL.createObjectURL(file);
      
      // Process the image (optional: remove background)
      const processedImage = await removeBackground(imageUrl);
      
      console.log("Image processed successfully:", processedImage);
      
      // Store in localStorage for persistence
      const storageKey = `echowear_images_${Date.now()}`;
      const imageData = {
        id: storageKey,
        url: processedImage,
        type: clothingType,
        uploadDate: new Date().toISOString(),
        name: file.name
      };
      
      // Save to local storage
      try {
        const existingStorage = localStorage.getItem('echowear_image_storage');
        let imagesStorage = existingStorage ? JSON.parse(existingStorage) : [];
        imagesStorage.push(imageData);
        localStorage.setItem('echowear_image_storage', JSON.stringify(imagesStorage));
        
        console.log('Image stored successfully:', imageData);
      } catch (storageError) {
        console.error('Error storing image in localStorage:', storageError);
      }
      
      // Pass the processed image URL back
      onImageUploaded(processedImage, clothingType);
      
      toast({
        title: "Image uploaded and stored",
        description: `Your ${clothingType} image has been applied to the avatar and saved to your collection`,
      });
    } catch (error) {
      console.error("Error processing image:", error);
      toast({
        title: "Upload failed",
        description: "There was an error processing your image",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      <label className="cursor-pointer">
        <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg border-gray-300 bg-gray-50 hover:bg-gray-100">
          {isUploading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-sm text-gray-500">Processing...</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  Upload an image for {clothingType}
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
            </>
          )}
        </div>
      </label>
    </div>
  );
};

export default ClothingImageUpload;
