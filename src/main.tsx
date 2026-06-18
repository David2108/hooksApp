import {StrictMode, Suspense} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {ClientInformation} from "@/08-use-suspense/ClientInformation.tsx";
import {getUserAction} from "@/08-use-suspense/api/get-user.action.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={(
        <div className='bg-gradient flex flex-col'>
            <h1 className='text-2xl'>Loading...</h1>
        </div>
    )}>
        <ClientInformation getUser={getUserAction(1)}/>
    </Suspense>
  </StrictMode>,
)
