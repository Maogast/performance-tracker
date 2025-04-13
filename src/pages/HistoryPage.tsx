// src/pages/HistoryPage.tsx

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  TextField,
  Box,
  Button,
} from "@mui/material";
import usePerformanceEntries from "../hooks/usePerformanceEntries";
import { deletePerformanceEntry } from "../services/performanceService";

const HistoryPage: React.FC = () => {
  // Get the performance entries (updated in real-time from Firestore)
  const dailyData = usePerformanceEntries();

  // States for filtering by category and date range.
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  // Helper: formats timestamp to a human-friendly string.
  const formatTimestamp = (timestamp: number | Date) => {
    const date = typeof timestamp === "number" ? new Date(timestamp) : timestamp;
    return date.toLocaleString();
  };

  // Sort entries: most recent first.
  const sortedData = [...dailyData].sort((a, b) => {
    const timeA = typeof a.timestamp === "number" ? a.timestamp : a.timestamp.getTime();
    const timeB = typeof b.timestamp === "number" ? b.timestamp : b.timestamp.getTime();
    return timeB - timeA;
  });

  // Filter entries based on category and date range.
  const filteredData = sortedData.filter((entry) => {
    // Filter by category if specified.
    if (filterCategory && entry.category) {
      if (!entry.category.toLowerCase().includes(filterCategory.toLowerCase())) {
        return false;
      }
    }
    // Filter by start date.
    if (filterStartDate) {
      const startDate = new Date(filterStartDate).getTime();
      const entryTime = typeof entry.timestamp === "number" ? entry.timestamp : entry.timestamp.getTime();
      if (entryTime < startDate) {
        return false;
      }
    }
    // Filter by end date.
    if (filterEndDate) {
      const endDate = new Date(filterEndDate).getTime();
      const entryTime = typeof entry.timestamp === "number" ? entry.timestamp : entry.timestamp.getTime();
      if (entryTime > endDate) {
        return false;
      }
    }
    return true;
  });

  // Delete handler with confirmation.
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this entry?");
    if (confirmed) {
      await deletePerformanceEntry(id);
    }
  };

  // Function to download archived monthly data.
  const downloadArchivedData = async () => {
    try {
      // Replace '/archiveMonthlyData' with your actual API endpoint.
      const response = await fetch("/archiveMonthlyData");
      if (!response.ok) {
        throw new Error("Archive download failed");
      }
      const data = await response.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ArchivedPerformanceData.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading archive:", error);
    }
  };

  // Monthly reset logic: if a month has passed, run archive/reset actions.
  useEffect(() => {
    const now = new Date().getTime();
    const lastReset = localStorage.getItem("lastReset");
    const oneMonth = 30 * 24 * 60 * 60 * 1000; // Approximate duration in ms
    if (!lastReset || now - parseInt(lastReset) > oneMonth) {
      localStorage.setItem("lastReset", now.toString());
      // Here you can trigger archive actions (for example through an API)
      console.log("Monthly reset triggered. Archiving current data.");
    }
  }, []);

  const clearFilters = () => {
    setFilterCategory("");
    setFilterStartDate("");
    setFilterEndDate("");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        History / Logs
      </Typography>

      {/* Filtering Inputs */}
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Filter by Category"
          variant="outlined"
          fullWidth
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Start Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          fullWidth
          value={filterStartDate}
          onChange={(e) => setFilterStartDate(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="End Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          fullWidth
          value={filterEndDate}
          onChange={(e) => setFilterEndDate(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="outlined" onClick={clearFilters}>
          Clear Filters
        </Button>
      </Box>

      {/* Displaying the filtered data with delete button */}
      <List>
        {filteredData.map((entry, index) => (
          <ListItem key={entry.id || index} divider>
            <Box sx={{ flexGrow: 1 }}>
              {entry.value}
              {entry.category && ` (${entry.category})`}
              {entry.note && ` - ${entry.note}`}
              {" | "}
              <em>{formatTimestamp(entry.timestamp)}</em>
            </Box>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => handleDelete(entry.id as string)}
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </List>

      {/* Download Archived Data Button */}
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Button variant="contained" color="secondary" onClick={downloadArchivedData}>
          Download Archived Data
        </Button>
      </Box>
    </Container>
  );
};

export default HistoryPage;