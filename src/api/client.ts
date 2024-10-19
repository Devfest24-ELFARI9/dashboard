// src/api/apiClient.ts
// TODO: use Lucia
export const apiClient = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  const token = localStorage.getItem("authToken"); // Assuming you store the token in localStorage

  const headers = {
    ...options.headers,
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch( process.env.NEXT_PUBLIC_API_URL + endpoint, {
    ...options,
    headers,
  });

  if (!response.ok) {
    // Handle different error cases
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return await response.json();
};
