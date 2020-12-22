import React from 'react'
import { Col, Container, Navbar, NavbarBrand, Row } from 'react-bootstrap';
import './App.css';
import DataTypeTable from './components/DataTypeTable';

export default class App extends React.Component {
    componentDidMount() {
        var editor = ace.edit("editor"); // tslint:disable-line
        editor.setTheme("ace/theme/monokai");
        editor.session.setMode("ace/mode/dbml");
    }

    render() {
        return (
            <React.Fragment>
                <Navbar>
                    <Container fluid>
                        <NavbarBrand as="h3">DBML Data Generator</NavbarBrand>
                    </Container>
                </Navbar>

                <Row noGutters={true}>
                    <Col xs={12} sm={4}>
                        <div id="editor"></div>
                    </Col>
                    <Col>
                        <DataTypeTable/>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}
