import React from 'react'
import { Col, Container, NavbarBrand, Row } from 'react-bootstrap'
import DataInterface from './components/DataInterface';
const { Parser } = require('@dbml/core');

interface AppState {
    database: Object
}

export default class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            database: Parser.parse(defaultEditorContent, 'dbml')
        }
    }

    componentDidMount() {
        const editor = ace.edit("editor")
        editor.setTheme("ace/theme/dracula")
        editor.session.setMode("ace/mode/dbml")
        editor.session.on("change", () => {
            const dbml = editor.session.getValue()
            const database = Parser.parse(dbml, 'dbml')
            this.setState({ database })
        })
    }

    render() {
        return (
            <React.Fragment>
                <Row id="top-bar">
                    <Container fluid>
                        <Col>
                            <NavbarBrand as="h3">DBML Data Generator</NavbarBrand>
                        </Col>
                    </Container>
                </Row>

                <Row noGutters style={{ height: "100%" }}>
                    <Col xs={12} sm={5}>
                        <div id="editor">{defaultEditorContent}</div>
                    </Col>
                    <Col id="data-interface-container">
                        <DataInterface database={this.state.database}/>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

const defaultEditorContent = `// Example taken from dbdiagram.io
//// -- LEVEL 1
//// -- Tables and References

// Creating tables
Table users as U {
  id int [pk, increment] // auto-increment
  full_name varchar
  created_at timestamp
  country_code int
}

Table countries {
  code int [pk]
  name varchar
  continent_name varchar
 }

// Creating references
// You can also define relaionship separately
// > many-to-one; < one-to-many; - one-to-one
Ref: U.country_code > countries.code  
Ref: merchants.country_code > countries.code

//----------------------------------------------//

//// -- LEVEL 2
//// -- Adding column settings

Table order_items {
  order_id int [ref: > orders.id] // inline relationship (many-to-one)
  product_id int
  quantity int [default: 1] // default value
}

Ref: order_items.product_id > products.id

Table orders {
  id int [pk] // primary key
  user_id int [not null, unique]
  status varchar
  created_at varchar [note: 'When order created'] // add column note
}

//----------------------------------------------//

//// -- Level 3 
//// -- Enum, Indexes

// Enum for 'products' table below
Enum products_status {
  out_of_stock
  in_stock
  running_low [note: 'less than 20'] // add column note
}

// Indexes: You can define a single or multi-column index 
Table products {
  id int [pk]
  name varchar
  merchant_id int [not null]
  price int
  status products_status
  created_at datetime [default: \`now()\`]
  
  Indexes {
    (merchant_id, status) [name:'product_status']
    id [unique]
  }
}

Table merchants {
  id int
  country_code int
  merchant_name varchar
  
  "created at" varchar
  admin_id int [ref: > U.id]
  Indexes {
    (id, country_code) [pk]
  }
}

Table merchant_periods {
  id int [pk]
  merchant_id int
  country_code int
  start_date datetime
  end_date datetime
}

Ref: products.merchant_id > merchants.id // many-to-one
//composite foreign key
Ref: merchant_periods.(merchant_id, country_code) > merchants.(id, country_code)
`