import React from 'react'
import { Tabs, Tab, Container } from 'react-bootstrap'
import SchemaTables from './Generator/SchemaTables/SchemaTables'

interface DataInterfaceProps {
    database: any;
}

interface DataInterfaceState {
    database: any;
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
                        <h2>Tables</h2>
                        <SchemaTables database={this.state.database} onFieldChange={this.onFieldChange} />
                    </Container>
                </Tab>
            </Tabs>
        )
    }
}