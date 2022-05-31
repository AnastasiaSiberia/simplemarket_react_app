import React from 'react';
import MyInput from "../UI/input/MyInput";
import MySelect from "../UI/select/MySelect";

const ProductFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MyInput
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
                placeholder="Поиск..."
                style = {
                    {
                        marginTop: '15px',
                        marginBottom: '15px'
                    }
                }
            />
            <MySelect
                defaultValue="Отсортировать по"
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                options={[
                    {value: 'популярность', name: 'популярности'},
                    {value: 'рейтинг', name: 'рейтингу'},
                    {value: 'возрастающая цена', name: 'цене по возрастанию'},
                    {value: 'убывающая цена', name: 'цене по убыванию'}
                ]}
            />
        </div>
    );
};

export default ProductFilter;