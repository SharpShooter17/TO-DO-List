import client from "../client"

class BaseApi {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    get(path) {
        return client({
            method: 'GET',
            path: this.baseUrl + path
        });
    }

    getWithCustomHeaders(path, headers) {
        return client({
            method: 'GET',
            path: this.baseUrl + path,
            headers: headers
        });
    }

    post(path, entity) {
        return client({
            method: 'POST',
            path: this.baseUrl + path,
            entity: entity
        });
    }

    postWithCustomHeaders(path, entity, headers) {
        return client({
            method: 'POST',
            path: this.baseUrl + path,
            entity: entity,
            headers: headers
        });
    }

    put(path, entity) {
        return client({
            method: 'PUT',
            path: this.baseUrl + path,
            entity: entity
        });
    }

    delete(path) {
        return client({
            method: 'DELETE',
            path: this.baseUrl + path
        });
    }

}

export default BaseApi;