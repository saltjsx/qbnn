import { StudioProvider, StudioLayout } from 'sanity'
import config from '../sanity.config'

export default function SanityStudio() {
  return (
    <StudioProvider config={config}>
      <StudioLayout />
    </StudioProvider>
  )
}

const root = document.getElementById('sanity')
if (root) {
  import('react-dom/client').then(({ createRoot }) => {
    createRoot(root).render(<SanityStudio />)
  })
}
