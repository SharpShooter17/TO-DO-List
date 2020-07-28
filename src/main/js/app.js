'use strict';

import React from "react";
import ReactDOM from "react-dom";
import {toast, ToastContainer} from "react-toastify"
import ToDoList from "./domain/ToDoList";
import {Button, Col, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import Autosuggest from 'react-autosuggest';

import api from "./api/Api";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import './autosuggest.css'

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            createForm: {
                name: ''
            },
            activeList: null,
            suggestions: [],
            search: ''
        };

        this.createToDoList = this.createToDoList.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onDelete() {
        this.setState({activeList: null});
        toast.info("List has been removed");
    }

    createToDoList(e) {
        e.preventDefault();
        const createForm = this.state.createForm;
        const todoList = {
            id: null,
            name: createForm.name,
            items: []
        };
        api.save(todoList).done(response => {
            if (response.status.code < 300) {
                toast.success("TO-DO List Created");
                this.setState({activeList: response.entity});
            }
        });
        createForm.name = '';
        this.setState({createForm: createForm});
    }

    onSuggestionsFetchRequested(input) {
        api.search(input.value).done(response => {
            if (response.status.code < 300) {
                this.setState({
                    suggestions: response.entity
                });
            }
        });
    }

    renderSuggestion(list) {
        return (<span>{list.name}</span>)
    }

    getSuggestionValue(list) {
        return list.name;
    }

    onSuggestionSelected(event, {suggestion, suggestionValue, suggestionIndex, sectionIndex, method}) {
        this.setState({activeList: suggestion});
    }

    render() {
        const createForm = this.state.createForm;
        const activeList = this.state.activeList;

        return (
            <div>
                <Container>
                    <Row className="m-5">
                        <Col>
                            <span className="display-3">TO-DO List App</span>
                        </Col>
                    </Row>
                    <Row className="m-5">
                        <Col>
                            <span className="h3">Create new TO-DO List</span>
                            <Form onSubmit={this.createToDoList}>
                                <FormGroup row>
                                    <Label sm={1} for="title" className="h5">Title</Label>
                                    <Col sm={10}>
                                        <Input type="text"
                                               name="title"
                                               id="title"
                                               value={createForm.name}
                                               onChange={e => {
                                                   createForm.name = e.target.value;
                                                   this.setState({createForm: createForm});
                                               }}/>
                                    </Col>
                                    <Button sm={1} type="submit" color="primary">Create</Button>
                                </FormGroup>
                            </Form>
                            <hr/>
                        </Col>
                    </Row>
                    <Row className="m-5">
                        <Col sm={1}>
                            <span className="h5">Search</span>
                        </Col>
                        <Col sm={10}>
                            <Autosuggest
                                suggestions={this.state.suggestions}
                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={() => this.setState({suggestions: []})}
                                getSuggestionValue={this.getSuggestionValue}
                                renderSuggestion={this.renderSuggestion}
                                onSuggestionSelected={this.onSuggestionSelected}
                                inputProps={{
                                    placeholder: 'Type title of TO-DO List',
                                    value: this.state.search,
                                    onChange: (event, {newValue}) => {
                                        this.setState({search: newValue})
                                    }
                                }}/>
                        </Col>
                    </Row>
                    <Row className="m-5">
                        <Col>
                            {activeList && (<ToDoList onDelete={this.onDelete} list={activeList}/>)}
                        </Col>
                    </Row>

                    <ToastContainer position="top-right"
                                    autoClose={10000}
                                    hideProgressBar={false}
                                    newestOnTop={false}
                                    closeOnClick={false}
                                    rtl={false}
                                    pauseOnFocusLoss={false}
                                    draggable={true}
                                    pauseOnHover={false}/>
                </Container>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('react')
);