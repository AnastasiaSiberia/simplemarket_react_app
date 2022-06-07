import axios from "axios";
import {encode as base64_encode} from 'base-64';

export default class ProductService {
    static async getById(id) {
        return await axios.get(`http://localhost:8080/products/${id}`, id)
    }
    static async getAllProductInfo() {
        return await axios.get('http://localhost:8080/product_info');
    }

    static async getCurUserInfo() {
        return await axios.get('http://localhost:8080/api/v1/auth/userinfo', this.getConfig())
    }

    static async authorize(p) {
        return await axios.post('http://localhost:8080/api/v1/auth/login', {
                username: p.username,
                password: base64_encode(p.password)
            },
            this.getConfig()
        )
    }

    static async addProduct(product) {
        return await axios.post('http://localhost:8080/add_product', {
                product_name: product.productName,
                product_description: product.productDescription,
                product_price: product.productPrice,
                product_quantity: product.productQuantity
            },
            this.getConfig()
        )
    }

    static async loadFile(productId, formData) {
        return await axios.post('http://localhost:8080/product_image/upload/' + productId, formData, this.getConfig())
    }

    static async getFileURL(vendorName, filename) {
        if(vendorName === undefined) return false
        const JWTToken = localStorage.getItem('JWTToken');
        const response = await axios({
            url: 'http://localhost:8080/product_image/' + vendorName + '/' + filename,
            method: 'GET',
            responseType: 'blob',
            headers: {
                'Authorization': 'Bearer ' + JWTToken
            }
        })
        let binaryData = [];
        binaryData.push(response.data);
        return URL.createObjectURL(new Blob(binaryData, {type: "application/zip"}))
    }

    static async pay(basketList) {
        return await axios.post('http://localhost:8080/buy', basketList, this.getConfig())

    }

    static async getOrders() {
        return await axios.get('http://localhost:8080/orders', this.getConfig())
    }

    static async addUser(authInfo) {
        return await axios.post('http://localhost:8080/api/v1/auth/registration',
            {
                'email': authInfo.email,
                'username': authInfo.username,
                'password': base64_encode(authInfo.password)
            },
            this.getConfig()
        ).then(() => true)
            .catch(error => error.response.data)
    }

    static async getAllUsers() {
        return await axios.get('http://localhost:8080/admin/users', this.getConfig())
    }

    static async changeRole(userId, newRole) {
        return await axios.post('http://localhost:8080/admin/change_role/',
            {
                userId: userId,
                role: newRole
            },
            this.getConfig()
        )
    }

    static async addViews(views) {
        return await axios.post('http://localhost:8080/products/add_views', views, this.getConfig())
    }


    static async addReview(productId, reviewValue, reviewText) {
        return await axios.post('http://localhost:8080/products/' + productId + '/review',
            {
                review_value: reviewValue,
                review_text: reviewText
            },
            this.getConfig()
        )
    }

    static async getReviewsByProductId(id) {
        return await axios.get('http://localhost:8080/products/' + id + '/reviews')
    }

    static async disableProduct(productId) {
        return await axios.get('http://localhost:8080/products/' + productId + '/disable', this.getConfig())
    }

    static getConfig() {
        return {
            headers: {
                "Content-type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('JWTToken')
            },
            withCredentials: true
        }
    }
}