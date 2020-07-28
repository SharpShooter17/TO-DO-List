import React from "react"
import {Button, ButtonGroup, Col, Input, Label, Row} from "reactstrap"
import EditableLabel from 'react-inline-edition';
import api from "../api/Api";

class ToDoList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            list: this.props.list,
            visibility: 'ALL'
        };

        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.removeList = this.removeList.bind(this);
    }

    addItem() {
        const list = this.state.list;
        list.items.push({
            title: '',
            description: '',
            completed: false
        });

        this.setState({list: list});
    }

    removeItem(item) {
        const list = this.state.list;
        list.items = list.items.filter(i => i !== item);
        this.setState({list: list});
        api.save(list);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.list !== this.state.list) {
            this.setState({list: nextProps.list});
        }
    }

    removeList() {
        api.delete(this.state.list.id).done(response => {
            if (response.status.code < 300) {
                this.props.onDelete();
            }
        });
    }

    render() {
        const list = this.state.list;
        const visibility = this.state.visibility;
        var showItems = [];

        if (visibility === 'ALL') {
            showItems = list.items;
        } else if (visibility === 'TO_DO') {
            showItems = list.items.filter(item => !item.completed)
        } else {
            showItems = list.items.filter(item => item.completed)
        }

        const items = showItems.map(item => {
            const completedStyles = item.completed ? 'completed' : '';
            return (
                <Row className={completedStyles}>
                    <Col>
                        <Row>
                            <Col>
                                <Input type="checkbox"
                                       checked={item.completed}
                                       onChange={e => {
                                           item.completed = e.target.checked;
                                           this.setState({list: list});
                                           api.save(list);
                                       }}/>
                                <span className="h5 editable-input">
                                <EditableLabel text={item.title}
                                               labelPlaceHolder="No title"
                                               onFocusOut={title => {
                                                   item.title = title;
                                                   this.setState({list: list});
                                                   api.save(list);
                                               }}/>
                            </span>
                            </Col>
                            <Col sm={1}>
                                <Button onClick={() => this.removeItem(item)}
                                        size="sm"
                                        outline
                                        color="danger">
                                    -
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="editable-input lead">
                                    <EditableLabel text={item.description}
                                                   labelPlaceHolder="No description"
                                                   onFocusOut={description => {
                                                       item.description = description;
                                                       this.setState({list: list});
                                                       api.save(list);
                                                   }}/>
                                </p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            )
        });

        return (
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <h3 className="editable-input">
                                <EditableLabel text={list.name} labelPlaceHolder="No name"
                                               onFocusOut={name => {
                                                   list.name = name;
                                                   this.setState({list: list});
                                                   api.save(list);
                                               }}/>
                            </h3>
                        </Col>
                        <Col sm={3}>
                            <ButtonGroup className="w-100">
                                <Button onClick={this.addItem}
                                        size="sm"
                                        color="success">
                                    Add item
                                </Button>
                                <Button onClick={this.removeList}
                                        size="sm"
                                        color="danger">
                                    Remove list
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col>
                            <p className="editable-input lead">
                                <EditableLabel text={list.description}
                                               labelPlaceHolder="No description"
                                               onFocusOut={description => {
                                                   list.description = description;
                                                   this.setState({list: list});
                                                   api.save(list);
                                               }}/>
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Label check>
                                <Input type="radio"
                                       name="visibility"
                                       checked={visibility === 'ALL'}
                                       onClick={e => {
                                           this.setState({visibility: 'ALL'});
                                       }}/>
                                All
                            </Label>
                        </Col>
                        <Col>
                            <Label check>
                                <Input type="radio"
                                       name="visibility"
                                       checked={visibility === 'TO_DO'}
                                       onClick={e => {
                                           this.setState({visibility: 'TO_DO'});
                                       }}/> TO-DO
                            </Label>
                        </Col>
                        <Col>
                            <Label check>
                                <Input type="radio"
                                       name="visibility"
                                       checked={visibility === 'DONE'}
                                       onClick={e => {
                                           this.setState({visibility: 'DONE'});
                                       }}/> DONE
                            </Label>
                        </Col>
                    </Row>
                    {items}
                </Col>
            </Row>
        )
    }

}

export default ToDoList;