import axios from "axios";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1dnBvbHdobG5hZmtkeWVucWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjAyODQ0NjIsImV4cCI6MTk3NTg2MDQ2Mn0.YS7SZtMPIrqZvbdGkL3RHIMow-PtfoeDJjcTjw-M6dY";

export const instance = axios.create({
  baseURL: "https://yuvpolwhlnafkdyenqik.functions.supabase.co/",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});
