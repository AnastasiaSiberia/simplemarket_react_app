import React from 'react';
import MyInput from "../UI/input/MyInput";

const ProductFilter = ({query, setQuery}) => {
    return (
        <div>
            <MyInput
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Поиск..."
            />
        </div>
    );
};

export default ProductFilter;