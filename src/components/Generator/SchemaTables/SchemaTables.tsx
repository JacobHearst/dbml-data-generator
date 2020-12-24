import React from 'react'
import { Accordion } from 'react-bootstrap'
import SchemaTable, { FieldChangeHandler } from './SchemaTable'

interface SchemaTablesProps {
    database: Object
    onFieldChange: typeof FieldChangeHandler
}

interface SchemaTablesState {
    database: any
}

export default class SchemaTables extends React.Component<SchemaTablesProps, SchemaTablesState> {
    constructor(props: SchemaTablesProps) {
        super(props)
        this.state = {
            database: props.database
        }
    }

    render() {
        return (
            this.state.database.schemas[0].tables.map((table: any) => (
                <Accordion defaultActiveKey={table.name} key={table.name}>
                    <Accordion.Toggle as="h3" style={{ textDecoration: "underline", cursor: "pointer"}} eventKey={table.name}>
                        {table.name}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={table.name}>
                        <SchemaTable table={table} onFieldChange={this.props.onFieldChange}/>
                    </Accordion.Collapse>
                </Accordion>
            ))
        )
    }
}
