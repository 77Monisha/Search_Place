import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Home from "./component/Home/Home";

function App() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState(5);

  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      if (limit > 10 || !searchQuery) return;
      setLoading(true);
      try {
        const response = await axios.get(
          "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
          {
            params: {
              countryIds: "IN",
              namePrefix: searchQuery,
              limit,
            },
            headers: {
              "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
              "x-rapidapi-key": apiKey,
            },
          }
        );
        setCities(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchQuery, limit]);

  return (
    <div className="app">
      <h1 className="main_heading">Search Place App</h1>

      <Home
        cities={cities}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        limit={limit}
        setLimit={setLimit}
        loading={loading}
      />
    </div>
  );
}

export default App;
