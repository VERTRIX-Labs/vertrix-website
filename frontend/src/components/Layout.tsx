import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { CustomCursor } from './CustomCursor'

export function Layout() {
  return (
    <>
      <CustomCursor />
      <Header />
      <main><Outlet /></main>
      <Footer />
    </>
  )
}
