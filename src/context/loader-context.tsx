"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface LoaderContextType {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = useCallback(() => setIsLoading(true), []);
  const stopLoading = useCallback(() => setIsLoading(false), []);

  return (
    <LoaderContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = (): LoaderContextType => {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
};
