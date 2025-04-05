
/**
 * Utility functions for image processing
 */

/**
 * Removes the background from an image and replaces it with white
 * @param imageUrl URL of the image to process
 * @returns Promise that resolves to the URL of the processed image
 */
export const removeBackground = async (imageUrl: string): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      // Set canvas dimensions to match image
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw the original image
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        
        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Simple background removal based on color similarity
        // This is a simplified approach - in a real app, you would use a more sophisticated algorithm
        // or a background removal service
        
        // Define what we consider "background" (light pixels)
        const THRESHOLD = 230; // Higher value = more aggressive removal
        
        // Sample the corners to guess the background color
        const corners = [
          { x: 0, y: 0 },
          { x: canvas.width - 1, y: 0 },
          { x: 0, y: canvas.height - 1 },
          { x: canvas.width - 1, y: canvas.height - 1 }
        ];
        
        // For each pixel, check if it's similar to the background color
        for (let i = 0; i < data.length; i += 4) {
          // Check if the pixel is likely background (light colored)
          const isLightPixel = data[i] > THRESHOLD && 
                               data[i + 1] > THRESHOLD && 
                               data[i + 2] > THRESHOLD;
          
          if (isLightPixel) {
            // Set to white and fully transparent
            data[i] = 255;     // R
            data[i + 1] = 255; // G
            data[i + 2] = 255; // B
            data[i + 3] = 0;   // A (transparent)
          }
        }
        
        // Put the modified image data back on the canvas
        ctx.putImageData(imageData, 0, 0);
        
        // Fill with white background
        const finalCanvas = document.createElement('canvas');
        const finalCtx = finalCanvas.getContext('2d');
        finalCanvas.width = canvas.width;
        finalCanvas.height = canvas.height;
        
        if (finalCtx) {
          // Fill with white background
          finalCtx.fillStyle = '#FFFFFF';
          finalCtx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
          
          // Draw the transparent image on top
          finalCtx.drawImage(canvas, 0, 0);
          
          // Convert to data URL and resolve
          resolve(finalCanvas.toDataURL('image/png'));
        } else {
          // Fallback if context creation fails
          resolve(imageUrl);
        }
      } else {
        // Fallback if context creation fails
        resolve(imageUrl);
      }
    };
    
    img.onerror = () => {
      // Return original image if processing fails
      resolve(imageUrl);
    };
    
    img.src = imageUrl;
  });
};
