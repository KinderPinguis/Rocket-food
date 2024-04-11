import React, {useEffect, useState} from "react";
import './HomeCustomer.css'
import {Row} from "antd";
import Card from "./Card";
import DominosImg from '../Image/DominosPizza.jpeg';
import axios from 'axios';
import {useNavigate} from "react-router-dom";


const HomeCustomer: React.FC = () => {
    const getCategories = `http://localhost:5000/api/categories`;
    const [categories, setCategories] = useState<any[]>([]);
    const [restaurants, setRestaurants] = useState<any[]>([]);
    const navigate = useNavigate();


    const fetchCategories = async () => {
        try {
            await axios.get(getCategories)
                .then(response => {
                    setCategories(response.data);
                })
        } catch (error) {
            console.error('Erreur lors de la récupération des restaurants :', error);
        }
    }

    const fetchRestaurantsData = async () => {
        try {
            const allRestaurants = [];
            for (const category of categories) {
                const response = await axios.get(`http://localhost:5000/api/restaurantCategories/${category.name}`);
                allRestaurants.push(...response.data); // Ajouter les nouveaux restaurants à la liste existante
                console.log(response.data)

            }
            setRestaurants(allRestaurants); // Mettre à jour l'état après la boucle
        } catch (error) {
            console.error('Erreur lors de la récupération des restaurants :', error);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchRestaurantsData();
    },);

    const handleClick = (restaurantId: string) => {
        navigate(`/RestaurantPage/${restaurantId}`);
    };

    return (
        <div>
            <Row wrap={true} justify={"center"}>
                <p>Customer</p>
            </Row>
            {categories.map((category, index) => (
                <Row wrap={true} justify={"center"}>
                    <h2 key={index}>{category.name.toUpperCase()}</h2>
                    <Row wrap={true} justify={"center"}>
                        {restaurants.filter((restaurant) => restaurant.categories.includes(category.name)).map((restaurant, index) => (
                            <Card
                                key={index}
                                title={restaurant.nameRestaurant}
                                description={restaurant.categories}
                                image={DominosImg}
                                onClick={() => handleClick(restaurant.id)}
                            />
                        ))}
                    </Row>
                </Row>
            ))}


        </div>
    );
};


export default HomeCustomer;