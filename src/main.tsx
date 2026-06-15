import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {FocusScreen} from "./04-useRef/FocusScreen.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FocusScreen />
  </StrictMode>,
)
