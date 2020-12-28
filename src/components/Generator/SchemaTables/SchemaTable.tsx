import React from 'react'
import { Form, Table } from 'react-bootstrap'

interface SchemaTableProps {
    table: any
    onFieldChange: FieldChangeHandler
}

let FieldChangeHandlerDef: (fieldId: String, value: any) => void
export type FieldChangeHandler = typeof FieldChangeHandlerDef

export default class SchemaTable extends React.Component<SchemaTableProps, {}> {
    constructor(props: SchemaTableProps) {
        super(props)
        
        this.nullPercentChange = this.nullPercentChange.bind(this)
    }

    nullPercentChange(event: any) {
        this.props.onFieldChange(event.target.id, event.target.value)
    }

    render() {
        const { table } = this.props
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Column name</th>
                        <th>Column SQL type</th>
                        <th>% of null values</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        table.fields.map(({ name, type: { type_name } }: any) => (
                            <tr key={name}>
                                <td>{name}</td>
                                <td>{type_name}</td>
                                <td>
                                    <Form.Control
                                        id={`${table.name}-${name}-${type_name}`}
                                        onChange={this.nullPercentChange}
                                        type="number" 
                                        defaultValue={0} 
                                        min={0}
                                        max={100}/>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        )
    }
}