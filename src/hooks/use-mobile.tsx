import * as React from "react"

// Define breakpoints for different device sizes
const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

export function useDeviceSize() {
  const [deviceSize, setDeviceSize] = React.useState<"mobile" | "tablet" | "desktop">("desktop")
  
  React.useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth
      if (width < MOBILE_BREAKPOINT) {
        setDeviceSize("mobile")
      } else if (width < TABLET_BREAKPOINT) {
        setDeviceSize("tablet")
      } else {
        setDeviceSize("desktop")
      }
    }
    
    // Set initial size
    updateSize()
    
    // Add event listener for window resize
    window.addEventListener("resize", updateSize)
    
    // Cleanup
    return () => window.removeEventListener("resize", updateSize)
  }, [])
  
  return deviceSize
}

// Keep the original hook for backward compatibility
export function useIsMobile() {
  const deviceSize = useDeviceSize()
  return deviceSize === "mobile"
}
