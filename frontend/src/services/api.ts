// Placeholder API layer. Not called automatically yet.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export async function healthCheck() {
  const response = await fetch(`${API_BASE_URL}/health`);

  if (!response.ok) {
    throw new Error("Backend unavailable");
  }

  return response.json();
}
