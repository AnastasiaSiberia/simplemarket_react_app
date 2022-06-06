import React, {useEffect, useState} from 'react';
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";
import {useFetching} from "../../hooks/useFetching";
import ProductService from "../../API/ProductService";

const ProductForm = ({setModal}) => {
    const [newProductId, setNewProductId] = useState(-1)
    const [formData, setFormData] = useState({})
    const [product, setProduct] = useState({productName:'', productDescription:'', productPrice: '', productQuantity: ''});

    const [uploadFile, isFileLoading, fileLoadError] = useFetching(async() => {
        await ProductService.loadFile(newProductId, formData)
    })

    const addNewProduct = async (e) => {
        e.preventDefault()
        const response = await ProductService.addProduct(product)
        setNewProductId(response.data)
        setProduct({productName: '', productDescription: '', productPrice: '', productQuantity: ''})
    }

    useEffect(() => {
        if(newProductId !== -1) {
            uploadFile()
            setModal(false)
        }
    }, [newProductId])

    const UploadContent = (event) => {
        if (event.target.files) {
            const tempFormData = new FormData();
            tempFormData.append('file', event.target.files[0]);
            setFormData(tempFormData)
        }
    };

    return (
        <form>
            <MyInput type="text" placeholder={"Введите имя продукта"}
                     value={product.productName}
                     onChange={event => setProduct({...product, productName: event.target.value})}
            />
            <MyInput type="text" placeholder={"Введите описание продукта"}
                     value={product.productDescription}
                     onChange={event => setProduct({...product, productDescription: event.target.value})}
            />
            <MyInput type="text" placeholder={"Введите цену  продукта"}
                     value={product.productPrice}
                     onChange={event => setProduct({...product, productPrice: event.target.value})}
            />
            <MyInput type="text" placeholder={"Введите количество продукта"}
                     value={product.productQuantity}
                     onChange={event => setProduct({...product, productQuantity: event.target.value})}
            />
            <MyInput
                type="file"
                onChange={UploadContent}
            />
            <MyButton onClick={addNewProduct}>Добавить продукт</MyButton>
        </form>
    );
};

export default ProductForm;