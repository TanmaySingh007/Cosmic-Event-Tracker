import React, { createContext, useContext, useMemo, useState } from 'react'

const NeoDataContext = createContext({ neos: [], setNeos: () => {} })

export const NeoProvider = ({ children }) => {
  const [neos, setNeos] = useState([])
  const value = useMemo(() => ({ neos, setNeos }), [neos])
  return <NeoDataContext.Provider value={value}>{children}</NeoDataContext.Provider>
}

export const useNeoData = () => useContext(NeoDataContext)


