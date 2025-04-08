// src/hooks/usePerformanceEntries.ts
import { useState, useEffect } from "react";
import { PerformanceEntry } from "../features/performance/performanceSlice";
import { getPerformanceEntries } from "../services/performanceService";

const usePerformanceEntries = () => {
  const [entries, setEntries] = useState<PerformanceEntry[]>([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedEntries = await getPerformanceEntries();
      setEntries(fetchedEntries);
    }
    fetchData();
  }, []);

  return entries;
};

export default usePerformanceEntries;