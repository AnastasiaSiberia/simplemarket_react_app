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

    static async getLoginPage() {
        return await axios.get('http://localhost:8080/login')
    }
}