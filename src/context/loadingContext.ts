import { createContext } from 'react';
import type { LoadingContextType } from '../data/types';

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);
