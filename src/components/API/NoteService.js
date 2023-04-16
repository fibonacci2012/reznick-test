import axios from "axios";

export default class NoteService {
    static async getAll() {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
        return response.data
    }
}