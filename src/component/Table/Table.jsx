import React, { useEffect, useState } from "react";
import "./table.css";
import axios from "axios";
import spinner from "../../assets/spinner.svg";

export const TableList = ({ cities, loading, searchQuery }) => {
  const [flags, setFlags] = useState({});

  useEffect(() => {
    const fetchFlags = async () => {
      const flagsData = {};
      try {
        const countryCode = cities?.country_id?.split("-")[0];
        const response = await axios.get(
          `https://www.countryflags.io/${countryCode}/flat/64.png`,
          { responseType: "blob" }
        );
        if (response.status === 200) {
          const imageUrl = URL.createObjectURL(response.data);
          flagsData[city.id] = imageUrl;
        } else {
          flagsData[city.id] = null;
        }

        setFlags(flagsData);
      } catch (error) {
        console.error("Error fetching flags:", error);
      }
    };

    fetchFlags();
  }, []);

  return (
    <div>
      <div className="table-container">
        <table className="table">
          <thead className="heading">
            <tr>
              <th>#</th>
              <th>Place Name</th>
              <th>Country</th>
            </tr>
          </thead>
          {searchQuery ? (
            <tbody>
              {loading ? (
                <div className="spinner_container">
                  <img src={spinner} alt="Spinner" className="spinner" />
                </div>
              ) : cities.length > 0 ? (
                cities.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td className="country_flag">
                      <span>{item.country}</span>
                      <img
                        src={`https://flagsapi.com/${item.countryCode}/flat/64.png`}
                        alt={item.country_id}
                        className="country_img"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="not-found">
                    No Result Found
                  </td>
                </tr>
              )}
            </tbody>
          ) : (
            <span>Start Searching</span>
          )}
        </table>
      </div>
    </div>
  );
};

export default TableList;
