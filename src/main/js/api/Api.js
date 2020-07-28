import ErrorHandleApi from "./ErrorHandleApi";


class Api extends ErrorHandleApi {

    constructor() {
        super('/api/todo/');
    }

    save(todoList) {
        return this.post('', todoList);
    }

    search(input) {
        return this.get('search/?name=' + input);
    }

    delete(id) {
        return super.delete(id);
    }

}

const api = new Api();
export default api;