
import React from 'react';
import { useImageStorage } from '@/hooks/useImageStorage';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StoredImagesGalleryProps {
  filterType?: string;
}

const StoredImagesGallery: React.FC<StoredImagesGalleryProps> = ({ filterType }) => {
  const { images, isLoading, deleteImage } = useImageStorage();
  const { toast } = useToast();

  // Filter images by type if filterType is provided
  const displayedImages = filterType 
    ? images.filter(image => image.type === filterType) 
    : images;

  const handleDeleteImage = (id: string) => {
    deleteImage(id);
    toast({
      title: "Image deleted",
      description: "The image has been removed from your collection",
    });
  };

  if (isLoading) {
    return (
      <div className="text-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fashion-amber mx-auto"></div>
        <p className="mt-3 text-fashion-navy">Loading your image collection...</p>
      </div>
    );
  }

  if (displayedImages.length === 0) {
    return (
      <div className="text-center p-6 bg-fashion-light/30 rounded-xl">
        <p className="text-fashion-navy">
          {filterType 
            ? `No ${filterType} images in your collection yet.` 
            : "Your image collection is empty."}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Upload images to see them here.
        </p>
      </div>
    );
  }

  return (
    <Card className="bg-white shadow-sm border-0">
      <CardContent className="p-4">
        <h3 className="font-medium mb-3">
          {filterType ? `${filterType} Images` : 'Your Image Collection'}
        </h3>
        <ScrollArea className="h-[300px] w-full pr-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {displayedImages.map((image) => (
              <div key={image.id} className="group relative">
                <AspectRatio ratio={3/4} className="overflow-hidden rounded-md border border-fashion-amber/10">
                  <img 
                    src={image.url} 
                    alt={image.name} 
                    className="object-cover w-full h-full" 
                  />
                </AspectRatio>
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    size="icon" 
                    variant="destructive" 
                    className="h-8 w-8 rounded-full"
                    onClick={() => handleDeleteImage(image.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs truncate mt-1">{new Date(image.uploadDate).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default StoredImagesGallery;
