import axios from 'axios';

const customAxios = axios.create({
    // baseURL: '',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * 
 * Remove empty keys from request
 * 
*/
const clean = (obj) => {
    for (let key in obj) {
        if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
            delete obj[key];
        }
    }

    return obj;
}

customAxios.interceptors.request.use(
    (request) => {
        const { data } = request;
        // console.log(request);

        if (['post', 'put'].includes(request.method) && data !== undefined) {
            request.data = JSON.stringify(clean(data));
        }

        return request;
    },
    (error) => {}
)

export default customAxios;