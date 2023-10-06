import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Corrected the import statement
import { getRestaurant } from "../Actions/restaurantAction";
import "../components/css/count.css";
export const CountRestaurant = () => {
  const dispatch = useDispatch();

  // Corrected the typo 'cosnt' to 'const'
  const {
    count,
    pureVegRestaurantsCount,
    showVegOnly,
    loading,
    error,
  } = useSelector((state) => state.restaurants);

  useEffect(() => {
    // Corrected the action name from 'getRestaurants' to 'getRestaurant'
    dispatch(getRestaurant());
  }, [dispatch, showVegOnly]);

  return (
    <div>
      {loading ? (
        <p>Loading restaurant count...</p>
      ) : error ? (
        // Corrected the uppercase 'P' to lowercase 'p'
        <p>Error: {error}</p>
      ) : (
        <p className="NumOfRestro">
          {showVegOnly ? pureVegRestaurantsCount : count}
          <spam className="Restro">
            {showVegOnly
              ? pureVegRestaurantsCount === 1
                ? "restaurant"
                : "restaurants"
              : count === 1
              ? "restaurants"
              : "restaurants"}
          </spam>
          <hr />
        </p>
      )}
    </div>
  );
};
