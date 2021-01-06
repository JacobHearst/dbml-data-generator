import React from 'react'
import { Tabs, Tab, Container } from 'react-bootstrap'
import GeneratorService from '../services/GeneratorService'
import Database from '../types/model_structure/database'
import GeneratorControls from './Generator/GeneratorControls'
import SchemaTables from './Generator/SchemaTables/SchemaTables'

interface DataInterfaceProps {
    database: Database;
}

interface DataInterfaceState {
    database: Database;
}

export default class DataInterface extends React.Component<DataInterfaceProps, DataInterfaceState> {
    constructor(props: DataInterfaceProps) {
        super(props)
        this.state = { ...props }
    }

    onFieldChange(fieldId: String, value: any) {
        // TODO
        console.log(`Field '${fieldId}' changed. Recieved value: ${value}`)
    }

    render() {
        return (
            <Tabs defaultActiveKey="generate">
                <Tab eventKey="design" title="Design" disabled></Tab>
                <Tab eventKey="generate" title="Generate">
                    <Container>
                        <GeneratorControls />
                        <hr/>
                        <h2>Tables</h2>
                        <SchemaTables database={this.state.database} onFieldChange={this.onFieldChange} />
                    </Container>
                </Tab>
            </Tabs>
        )
    }
}