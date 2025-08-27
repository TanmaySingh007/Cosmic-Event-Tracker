import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

const Header = () => {
  return (
    <header className="bg-gradient-to-b from-black/40 to-slate-900 border-b border-slate-800 sticky top-0 backdrop-blur supports-[backdrop-filter]:bg-black/30 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-purple-400 bg-clip-text text-transparent">🌌 Cosmic Event Tracker</span>
            </Link>
          </div>
          
          <nav className="flex items-center space-x-4">
            <Link to="/" className="hidden sm:block">
              <Button variant="ghost">Events</Button>
            </Link>
            <Link to="/compare">
              <Button variant="ghost">Compare</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header


