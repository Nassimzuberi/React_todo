import * as axios from 'axios';

const fireBase = axios.create({
    baseURL : "https://todo-r-6f85c.firebaseio.com/"
})

export default fireBase;