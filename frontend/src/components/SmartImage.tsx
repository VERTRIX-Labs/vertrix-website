import { useEffect, useRef, useState } from 'react'
import type { ImgHTMLAttributes } from 'react'

// <img> that fades in once loaded. The parent shows a shimmer (`.shimmer`) until then.
export function SmartImage({ className = '', alt = '', ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const ref = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)

  // Cached images can finish loading before React attaches onLoad.
  useEffect(() => { if (ref.current?.complete) setLoaded(true) }, [])

  return (
    <img
      ref={ref}
      alt={alt}
      className={`smart-img ${loaded ? 'loaded' : ''} ${className}`.trim()}
      onLoad={() => setLoaded(true)}
      onError={() => setLoaded(true)}
      {...props}
    />
  )
}
