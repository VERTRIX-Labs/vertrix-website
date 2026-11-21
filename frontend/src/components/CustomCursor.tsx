import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let x = -100, y = -100, rx = -100, ry = -100, frame = 0
    const move = (event: MouseEvent) => { x = event.clientX; y = event.clientY }
    const animate = () => {
      rx += (x - rx) * 0.14
      ry += (y - ry) * 0.14
      if (dot.current) dot.current.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`
      if (ring.current) ring.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`
      frame = requestAnimationFrame(animate)
    }
    const hover = (event: MouseEvent) => {
      const interactive = (event.target as HTMLElement).closest('a, button, input, textarea, select')
      ring.current?.classList.toggle('hover', Boolean(interactive))
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', hover)
    frame = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', hover)
    }
  }, [])

  return <><div ref={dot} className="cursor-dot" /><div ref={ring} className="cursor-ring" /></>
}
