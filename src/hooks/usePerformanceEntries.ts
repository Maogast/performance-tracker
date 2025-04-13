// src/hooks/usePerformanceEntries.ts

import { useState, useEffect } from "react";
import { PerformanceEntry } from "../features/performance/performanceSlice";
import { subscribePerformanceEntries } from "../services/performanceService";

const usePerformanceEntries = () => {
  const [entries, setEntries] = useState<PerformanceEntry[]>([]);

  useEffect(() => {
    // Use the onSnapshot subscription for real-time updates
    const unsubscribe = subscribePerformanceEntries((fetchedEntries) => {
      setEntries(fetchedEntries);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return entries;
};

export default usePerformanceEntries;