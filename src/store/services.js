import Axios from 'axios'
import ExampleService from '../services/ExampleService'

Axios.defaults.headers.common.Accept = 'application/json'

export default {
    ExampleService: new ExampleService(Axios),
}
