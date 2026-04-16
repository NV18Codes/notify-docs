import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.2 })

  return (
    <motion.div
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-px origin-left bg-slate-900 dark:bg-slate-100"
      style={{ scaleX }}
      aria-hidden
    />
  )
}
