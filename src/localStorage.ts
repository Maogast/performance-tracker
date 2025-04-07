// src/localStorage.ts
export const loadState = (): any | undefined => {
    try {
      const serializedState = localStorage.getItem('performance');
      if (serializedState === null) return undefined;
      return JSON.parse(serializedState);
    } catch (error) {
      console.error("Error loading state:", error);
      return undefined;
    }
  };
  
  export const saveState = (state: any) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('performance', serializedState);
    } catch (error) {
      console.error("Error saving state:", error);
    }
  };