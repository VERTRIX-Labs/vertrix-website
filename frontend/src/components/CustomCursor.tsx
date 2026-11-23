import { useEffect, useRef } from 'react'

// Decorative cursor. The native cursor is only hidden (via the `has-cursor` class)
// once this component is actually running, so it can never leave users without one.
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    document.documentElement.classList.add('has-cursor')
    let x = -100, y = -100, rx = -100, ry = -100, frame = 0
    const move = (e: MouseEvent) => { x = e.clientX; y = e.clientY }
    const animate = () => {
      rx += (x - rx) * 0.14
      ry += (y - ry) * 0.14
      if (dot.current) dot.current.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`
      if (ring.current) ring.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`
      frame = requestAnimationFrame(animate)
    }
    const over = (e: MouseEvent) => {
      const interactive = (e.target as HTMLElement).closest('a, button, [role="button"]')
      ring.current?.classList.toggle('hover', Boolean(interactive))
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    frame = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [])

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
