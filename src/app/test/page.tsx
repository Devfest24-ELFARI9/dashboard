"use client";
import React, { useEffect, useState } from 'react'

export default function page() {
   const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Define the async function inside the useEffect
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5005/validate", {
            method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + "6wqrdrabwvxgdqi7iqarh7lazn5tn5k7t57r3wtx"
          }
        }); // Replace with your server API endpoint
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        setData(result);  // Assuming the result is JSON
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Call the function when the component mounts
  }, []); // Empty dependency array ensures it runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error} asd</div>;
  }

  return (
    <div>
        asdad
      <h1>Page Component</h1>
      {/* <div>Data from server: {JSON.stringify(data)}</div> */}
    </div>);
}
