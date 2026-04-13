import { Navigate, useParams } from 'react-router-dom'

/**
 * Pretty URLs for feature deep-links: /features/:slug → canonical docs path.
 */
export default function FeaturePage() {
  const { slug } = useParams()
  if (!slug) return <Navigate to="/docs/getting-started" replace />
  return <Navigate to={`/docs/features/${slug}`} replace />
}
