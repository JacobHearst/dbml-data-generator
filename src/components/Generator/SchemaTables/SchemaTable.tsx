import React from 'react'
import { Form, Table } from 'react-bootstrap'
import Field from '../../../types/model_structure/field'
import * as DBMLTable from '../../../types/model_structure/table'

interface SchemaTableProps {
    table: DBMLTable.default
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
                        <th>Primary Key?</th>
                        <th>Column SQL type</th>
                        <th>% of null values</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        table.fields.map(({ name, pk, type: { type_name } }: Field) => (
                            <tr key={name}>
                                <td>{name}</td>
                                <td>{pk ? "True" : "False"}</td>
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