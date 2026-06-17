import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {ScrambleWords} from "@/05-userReducer/ScrambleWords.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ScrambleWords />
  </StrictMode>,
)
