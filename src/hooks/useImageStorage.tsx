
import { useState, useEffect } from 'react';

export interface StoredImage {
  id: string;
  url: string;
  type: string;
  uploadDate: string;
  name: string;
}

export function useImageStorage() {
  const [images, setImages] = useState<StoredImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load images from localStorage on initial render
  useEffect(() => {
    const loadImages = () => {
      setIsLoading(true);
      try {
        const storedImages = localStorage.getItem('echowear_image_storage');
        if (storedImages) {
          setImages(JSON.parse(storedImages));
        }
      } catch (error) {
        console.error('Failed to load images from storage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  // Add a new image to storage
  const addImage = (image: StoredImage) => {
    setImages(prevImages => {
      const newImages = [...prevImages, image];
      localStorage.setItem('echowear_image_storage', JSON.stringify(newImages));
      return newImages;
    });
  };

  // Delete an image from storage
  const deleteImage = (imageId: string) => {
    setImages(prevImages => {
      const filteredImages = prevImages.filter(image => image.id !== imageId);
      localStorage.setItem('echowear_image_storage', JSON.stringify(filteredImages));
      return filteredImages;
    });
  };

  // Get images by type (clothing category)
  const getImagesByType = (type: string) => {
    return images.filter(image => image.type === type);
  };

  return {
    images,
    isLoading,
    addImage,
    deleteImage,
    getImagesByType
  };
}

export default useImageStorage;
