// src/services/performanceService.ts

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { PerformanceEntry } from "../features/performance/performanceSlice";

// Reference to the "performance" collection in Firestore.
const performanceCollectionRef = collection(db, "performance");

/**
 * Adds a performance entry to Firestore.
 */
export const addPerformanceEntry = async (entry: PerformanceEntry) => {
  try {
    const docRef = await addDoc(performanceCollectionRef, entry);
    console.log("Entry added with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding entry: ", error);
  }
};

/**
 * Subscribes to real-time updates of performance entries.
 * Calls the provided callback with an array of PerformanceEntry objects.
 */
export const subscribePerformanceEntries = (
  callback: (entries: PerformanceEntry[]) => void
) => {
  const q = query(performanceCollectionRef, orderBy("timestamp", "desc"));
  return onSnapshot(
    q,
    (snapshot) => {
      console.log("Snapshot size:", snapshot.size);
      const entries: PerformanceEntry[] = snapshot.docs.map((doc) => {
        const data = doc.data(); // Raw Firestore data
        return {
          id: doc.id, // Include the document ID
          value: data.value,
          timestamp:
            data.timestamp.toDate?.() || data.timestamp, // Convert Firestore Timestamp to Date if possible
          note: data.note || undefined,
          category: data.category || undefined,
        } as PerformanceEntry;
      });
      console.log("Received entries:", entries);
      callback(entries);
    },
    (error) => {
      console.error("Error fetching realtime entries: ", error);
    }
  );
};

/**
 * Fetches performance entries once from Firestore without a real-time subscription.
 */
export const getPerformanceEntries = async (): Promise<PerformanceEntry[]> => {
  try {
    const q = query(performanceCollectionRef, orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    const entries: PerformanceEntry[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        value: data.value,
        timestamp: data.timestamp.toDate?.() || data.timestamp,
        note: data.note || undefined,
        category: data.category || undefined,
      } as PerformanceEntry;
    });
    console.log("Fetched entries:", entries);
    return entries;
  } catch (error) {
    console.error("Error fetching entries: ", error);
    return [];
  }
};

/**
 * Deletes a performance entry from Firestore by its document ID.
 */
export const deletePerformanceEntry = async (id: string) => {
  try {
    const docRef = doc(db, "performance", id);
    await deleteDoc(docRef);
    console.log(`Entry with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting entry:", error);
  }
};