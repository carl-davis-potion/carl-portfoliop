"use client"

import { useEffect, useState, useRef } from "react"

interface AnimatedVerticalRulerProps {
  variant: "left" | "right"
}

export default function AnimatedVerticalRuler({ variant }: AnimatedVerticalRulerProps) {
  const [height, setHeight] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [offset, setOffset] = useState(0)
  const requestRef = useRef<number>()
  const speed = 1 // Pixels per frame

  useEffect(() => {
    const updateHeight = () => {
      setHeight(Math.max(document.documentElement.scrollHeight, document.body.scrollHeight))
    }

    const handleMouseMove = (event: MouseEvent) => {
      setMouseY(event.clientY)
    }

    const animate = () => {
      setOffset((prevOffset) => (prevOffset + speed) % 50)
      requestRef.current = requestAnimationFrame(animate)
    }

    updateHeight()
    window.addEventListener("resize", updateHeight)
    window.addEventListener("load", updateHeight)
    window.addEventListener("mousemove", handleMouseMove)
    requestRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", updateHeight)
      window.removeEventListener("load", updateHeight)
      window.removeEventListener("mousemove", handleMouseMove)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])

  const rulerClass = variant === "left" ? "left-0" : "right-0"
  const numberClass = variant === "left" ? "left-0 text-right pr-1" : "right-0 text-left pl-1"
  const lineClass = variant === "left" ? "right-0" : "left-0"

  return (
    <div
      className={`hidden md:block fixed top-0 max-h-[100vh] w-12 pointer-events-none select-none z-30 ${rulerClass} overflow-hidden ${
      variant === "left" ? "pr-[5px] border-r border-stroke-soft-200" : "pl-[5px] border-l border-stroke-soft-200"
      }`}
    >
      <div className="relative w-full" style={{ height: `${height}px` }}>
      <div className="absolute inset-0" style={{ transform: `translateY(-${offset}px)` }}>
        {[...Array(Math.ceil((height + 100) / 50))].map((_, i) => {
          const yPosition = i * 50 - 50
          const isCurrent = mouseY >= yPosition && mouseY < yPosition + 50
          const isPrevious = mouseY >= yPosition - 50 && mouseY < yPosition
          const isNext = mouseY >= yPosition + 50 && mouseY < yPosition + 100

          return (
        <div
          key={i}
          className=" absolute left-0 right-0 flex items-center justify-between"
          style={{ top: `${yPosition}px` }}
        >
          {variant === "right" && <div className={`w-3 border-t border-gray-300 ${lineClass}`} />}
          <span
            className={`text-subheading-2xs w-8 ${numberClass} ${
          isCurrent
            ? "text-text-strong-950"
            : isPrevious || isNext
            ? "text-text-sub-600"
            : "transition-all text-text-disabled-300"
            }`}
          >
            {Math.max(0, yPosition)}
          </span>
          {variant === "left" && <div className={` w-3 border-t border-gray-300 ${lineClass}`} />}
        </div>
          )
        })}
      </div>
      </div>
    </div>
  )
}

