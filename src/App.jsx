import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './features/events/HomePage'
import { NeoProvider } from './features/events/NeoContext'
import ComparePage from './features/compare/ComparePage'
import Auth from './supabase/Auth'
import { supabase } from './supabase/supabaseClient'

function App() {
  const [session, setSession] = useState(null)
  const requireAuth = import.meta.env.VITE_REQUIRE_AUTH !== 'false'

  useEffect(() => {
    let isMounted = true
    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) return
      setSession(data.session)
    })
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })
    return () => {
      isMounted = false
      authListener.subscription.unsubscribe()
    }
  }, [])

  if (requireAuth && !session) {
    return <Auth />
  }

  return (
    <Router>
      <NeoProvider>
        <div className="min-h-screen bg-background text-foreground flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/compare" element={<ComparePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </NeoProvider>
    </Router>
  )
}

export default App
