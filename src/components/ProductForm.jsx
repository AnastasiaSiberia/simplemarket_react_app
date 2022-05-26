import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const ProductForm = ({create}) => {
    const [product, setProduct] = useState({productName:'', productDescription:''});
    let formData

    const addNewProduct = (e) => {
        e.preventDefault()
        create(product, formData)
        setProduct({productName: '', productDescription: ''})

    }

    const UploadContent = (event) => {
        event.preventDefault();
        if (event.target.files) {
            formData = new FormData();
            formData.append('file', event.target.files[0]);
        }
    };

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
            <MyInput
                type="file"
                onChange={UploadContent}
            />
            <MyButton onClick={addNewProduct}>add</MyButton>
        </form>
    );
};

export default ProductForm;