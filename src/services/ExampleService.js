class ExampleService {
    axios
    baseUrl

    constructor (axios) {
        this.axios = axios
        this.baseUrl = 'http://jsonplaceholder.typicode.com/'
    }

    getAll (params) {
        const self = this
        return self.axios.get(`${self.baseUrl}posts`)
    }

    get (id) {
        const self = this
        return self.axios.get(`${self.baseUrl}posts/${id}`)
    }
}

export default ExampleService
