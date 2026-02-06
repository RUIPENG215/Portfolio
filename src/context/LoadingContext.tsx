import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { LoadingContextType } from '../data/types';

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoaded, setIsLoaded }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
