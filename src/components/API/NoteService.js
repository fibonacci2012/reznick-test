import axios from "axios";

export default class NoteService {
    static async getAll(limit = 3, page = 1) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params:{
                _limit: limit,
                _page: page
            }
        })
        return response
    }
}