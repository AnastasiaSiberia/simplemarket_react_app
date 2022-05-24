import axios from "axios";

export default class ProductService {
    static async getAll(limit = 10, page = 1) {
        return await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _limit: limit,
                _page: page
            }
        });
    }
    static async getById(id) {
        return await axios.get(`http://localhost:8080/products/${id}`, id)
    }
    static async getCommentByPostId(id) {
        return await axios.get(`http://localhost:8080/products/${id}/reviews`, id)
    }

    static async getAllProductInfo() {
        return await axios.get('http://localhost:8080/product_info');
    }

    static async getCurUserInfo() {
        const JWTToken = localStorage.getItem('JWTToken');
        console.log('"Bearer ' + JWTToken + '"')
        return await axios.get('http://localhost:8080/api/v1/auth/userinfo',
            {
                headers: {
                    'Authorization': 'Bearer ' + JWTToken
                },
                withCredentials: true
            }
            )
    }

    static async authorize(p) {
        try {
            return await axios.post('http://localhost:8080/api/v1/auth/login', {
                    username: p.username,
                    password: p.password
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })
        } catch(ex) {
            return {authError: ex.message}
        }
    }

    static async addProduct(product) {
        const JWTToken = localStorage.getItem('JWTToken');
        try{
            await axios.post('http://localhost:8080/add_product', {
                    product_name: product.productName,
                    product_description: product.productDescription
                },
                {
                    headers: {
                        'Authorization': 'Bearer ' + JWTToken
                    },
                    withCredentials: true
                }
            )
            return true;
        } catch (ex) {
            return false;
        }
    }

    static async onlyVendor(param) {
        const JWTToken = localStorage.getItem('JWTToken');
        try{
            return await axios.post('http://localhost:8080/only_vendor',
                {
                    product_name: 'skirt',
                    product_description: 'some text'
                },
                {
                    headers: {
                        'Authorization': 'Bearer ' + JWTToken,
                    },
                    withCredentials: true
                }
            )
            return true;
        } catch (ex) {
            return false;
        }
    }
}