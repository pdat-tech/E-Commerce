import { createContext, useEffect, useState } from 'react';
import { getProduct } from '@/apis/productService';

// eslint-disable-next-line react-refresh/only-export-components
export const OurShopContext = createContext();

export const OurShopProvider = ({ children }) => {
    const sortOptions = [
        { label: 'Default sorting', value: '0' },
        { label: 'Sort by popularity', value: '1' },
        { label: 'Sort by average rating', value: '2' },
        { label: 'Sort by latest', value: '3' },
        { label: 'Sort by price: low to high', value: '4' },
        { label: 'Sort by price: high to low', value: '5' }
    ];
    const showOptions = [
        { label: '8', value: '8' },
        { label: '12', value: '12' },
        { label: 'All', value: 'all' }
    ];

    const [sortId, setSortId] = useState("1");
    const [showId, setShowId] = useState("8");
    const [isShowGrid, setIsShowGrid] = useState(true);
    const [products, setProduct] = useState([]);
    const values = {
        sortOptions,
        showOptions,
        setSortId,
        setShowId,
        setIsShowGrid,
        products,
        isShowGrid
    };

    useEffect(() => {
        const query = {
            sortType: sortId,
            page: 1,
            limit: showId
        };

        getProduct(query)
            .then((res) => setProduct(res.contents))
            .catch((err) => console.log(err));
        
    }, [showId, sortId]);
    return (
        <OurShopContext.Provider value={values}>
            {children}
        </OurShopContext.Provider>
    );
};
