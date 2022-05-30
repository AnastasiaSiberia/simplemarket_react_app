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
            return await axios.post('http://localhost:8080/add_product', {
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
        } catch (ex) {
            return false;
        }
    }

    static async loadFile(productId, formData) {
        const JWTToken = localStorage.getItem('JWTToken');
        try{
            return await axios.post('http://localhost:8080/product_image/upload/' + productId,
                formData,
                {
                    headers: {
                        "Content-type": "multipart/form-data",
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

    static async getFileURL(vendorName, filename) {
        if(vendorName === undefined) return false
        const JWTToken = localStorage.getItem('JWTToken');
        try{
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
        } catch (ex) {
            return {}
        }
    }

    static async pay(basketList) {
        const JWTToken = localStorage.getItem('JWTToken');
        try{
            return await axios.post('http://localhost:8080/buy',
            basketList,
                {
                    headers: {
                        "Content-type": "application/json",
                        'Authorization': 'Bearer ' + JWTToken
                    },
                    withCredentials: true
                }
            )
        } catch (ex) {
            return false
        }
    }

    static async getOrders() {
        const JWTToken = localStorage.getItem('JWTToken');
        try{
            return await axios.get('http://localhost:8080/orders',
                {
                    headers: {
                        'Authorization': 'Bearer ' + JWTToken
                    },
                    withCredentials: true
                }
            )
        } catch (ex) {
            return []
        }
    }

    static async addUser(authInfo) {
        return await axios.post('http://localhost:8080/api/v1/auth/registration',
            {
                'email': authInfo.email,
                'username': authInfo.username,
                'password': authInfo.password
            },
            {
                withCredentials: true
            }
        )
    }

    static async getAllUsers() {
        return await axios.get('http://localhost:8080/admin/users',
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('JWTToken')
                },
                withCredentials: true
            }
        )
    }

    static async changeRole(userId, newRole) {
        return await axios.post('http://localhost:8080/admin/change_role/',
            {
                userId: userId,
                role: newRole
            },
            {
                headers: {
                    "Content-type": "application/json",
                    'Authorization': 'Bearer ' + localStorage.getItem('JWTToken')
                },
                withCredentials: true
            }
        )
    }

    static async addViews(views) {
        return await axios.post('http://localhost:8080/products/add_views',
            views,
            {
                headers: {
                    "Content-type": "application/json",
                    'Authorization': 'Bearer ' + localStorage.getItem('JWTToken')
                },
                withCredentials: true
            }
        )
    }


    static async addReview(productId, reviewValue, reviewText) {
        return await axios.post('http://localhost:8080/products/' + productId + '/review',
            {
                review_value: reviewValue,
                review_text: reviewText
            },
            {
                headers: {
                    "Content-type": "application/json",
                    'Authorization': 'Bearer ' + localStorage.getItem('JWTToken')
                },
                withCredentials: true
            }
        )
    }

    static async getReviewsByProductId(id) {
        return await axios.get('http://localhost:8080/products/' + id + '/reviews')
    }

}