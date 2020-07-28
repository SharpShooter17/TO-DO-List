import BaseApi from "./BaseApi"
import {toast} from 'react-toastify';

class ErrorHandleApi extends BaseApi {

    constructor(baseUrl) {
        super(baseUrl);
    }

    get(path) {
        return super.get(path).catch(this.handleError)
    }

    getWithCustomHeaders(path, headers) {
        return super.getWithCustomHeaders(path, headers).catch(this.handleError);
    }

    post(path, entity) {
        return super.post(path, entity).catch(this.handleError);
    }

    put(path, entity) {
        return super.put(path, entity).catch(this.handleError);
    }

    postWithCustomHeaders(path, entity, headers) {
        return super.postWithCustomHeaders(path, entity, headers).catch(this.handleError);
    }

    delete(path) {
        return super.delete(path).catch(this.handleError);
    }

    handleError(response) {
        const statusCode = response.status.code;
        if (statusCode < 200 || statusCode > 299) {
            console.log(statusCode, response.entity);
            const message = response.entity.message;
            const error = response.entity.error;
            toast.error(message);
        }
        return response;
    }

}

export default ErrorHandleApi