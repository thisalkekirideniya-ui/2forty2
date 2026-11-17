import { createContext, useContext, useMemo, useState } from 'react';

const AppStateContext = createContext({ introDone: true, setIntroDone: () => {} });

/** Tracks whether the first-visit preloader has finished, so hero animations wait for it. */
export function AppStateProvider({ children, initialIntroDone }) {
  const [introDone, setIntroDone] = useState(initialIntroDone);
  const value = useMemo(() => ({ introDone, setIntroDone }), [introDone]);
  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export const useAppState = () => useContext(AppStateContext);
