import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.24 })

  return (
    <motion.div
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-primary via-emerald-400 to-accent-light"
      style={{ scaleX }}
      aria-hidden
    />
  )
}
