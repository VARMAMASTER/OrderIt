import{useSelector,useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import{getMenus} from "../Actions/menuAction";
import {getRestaurant} from "../Actions/restaurantAction";
import React,{useEffect} from 'react'
import Fooditem from "./Fooditem";
import { setRestaurantId } from "../Actions/cartActions";

export default function Menu ({storeId} ) {
    const { id } = useParams();
    const dispatch = useDispatch();

    const {menus, loading, error } = useSelector((state) => state.menus);
    dispatch(setRestaurantId(id));

    useEffect(() => {
        dispatch(getMenus(id, storeId)); 
        dispatch(getRestaurant());
    }, [dispatch, id, storeId]);
    
    return (
        <div>
            {loading ? (
                <p>Loading menus...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : menus && menus.length > 0 ? (
                menus.map((menu) => (
                    <div key={menu._id}>
                        <h2>{menu.category}</h2>
                        <hr />
                        {menu.items && menu.items.length > 0 ? (
                            <div className="row">
                                {menu.items.map((fooditem) => (
                                    <Fooditem key={fooditem._id} fooditem={fooditem} />
                                ))}
                            </div>
                        ) : (
                            <p>No foodItems available</p>
                        )}
                    </div>
                ))
            ) : (
                <p>
                    No menus Available.
                </p>
            )}
        </div>
    );
};


