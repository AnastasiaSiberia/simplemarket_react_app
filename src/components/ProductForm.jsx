import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const ProductForm = ({create}) => {
    const [product, setProduct] = useState({productName:'', productDescription:''});

    const addNewProduct = (e) => {
        e.preventDefault()
        const newProduct = {
            ...product,
            id: Date.now()
        }
        create(newProduct)
        setProduct({productName: '', productDescription: ''})
    }

    return (
        <form>
            <MyInput type="text" placeholder={"productName"}
                     value={product.productName}
                     onChange={event => setProduct({...product, productName: event.target.value})}
            />
            <MyInput type="text" placeholder={"productDescription"}
                     value={product.productDescription}
                     onChange={event => setProduct({...product, productDescription: event.target.value})}
            />
            <MyButton onClick={addNewProduct}>add</MyButton>
        </form>
    );
};

export default ProductForm;