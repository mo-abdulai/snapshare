import React, { useState, useEffect } from "react";
import MasonryLayout from "./MasonryLayout";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import Spinner from "./Spinner";

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);

  const useDeBounce = (text, delay = 1000) => {
    
    const [deBounce, setDeBounce] = useState(text);

    useEffect(() => {
      const timer = setTimeout(() => {
        setDeBounce(text);
      }, delay);

      return () => {
        clearTimeout(timer);
      };
    }, [text, delay]);

    return deBounce;
  };

  const deBounceSearch = useDeBounce(searchTerm)

  useEffect(() => {
    if (deBounceSearch) {
      setLoading(true);
      const query = searchQuery(deBounceSearch.toLowerCase());
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [deBounceSearch]);

  return (
    <div>
      {loading && <Spinner message={"Searching for pins"} />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && deBounceSearch !== "" && !loading && (
        <div className="mt-10 text-center text-xl">No Pins Found!</div>
      )}
    </div>
  );
};

export default Search;
