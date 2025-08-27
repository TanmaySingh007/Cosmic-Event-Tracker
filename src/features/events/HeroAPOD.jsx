import React, { useEffect, useState } from 'react'
import axios from 'axios'

const HeroAPOD = () => {
  const [img, setImg] = useState('')
  const [title, setTitle] = useState('Astronomy Picture of the Day')

  useEffect(() => {
    const load = async () => {
      try {
        const key = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY'
        const { data } = await axios.get('https://api.nasa.gov/planetary/apod', { params: { api_key: key } })
        if (data && data.url) {
          setImg(data.url)
          setTitle(data.title || title)
        }
      } catch (e) {
        // ignore errors; keep defaults
      }
    }
    load()
  }, [])

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-800 shadow-2xl">
      {img ? (
        <img src={img} alt={title} className="w-full h-60 md:h-72 object-cover opacity-70" />
      ) : (
        <div className="h-60 md:h-72 w-full bg-gradient-to-r from-indigo-600/40 to-purple-600/40" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4">
        <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
        <p className="text-slate-300 text-sm">Courtesy of NASA APOD</p>
      </div>
    </div>
  )
}

export default HeroAPOD


