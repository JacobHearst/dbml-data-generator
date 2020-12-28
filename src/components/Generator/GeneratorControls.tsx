import React from 'react'
import { Button, Row, Col, Container, Form } from 'react-bootstrap'

export enum ExportFormat {
    SQL = "SQL"
}

interface GeneratorControlsState {
    rows: number;
    exportFormat: ExportFormat
}

export default class GeneratorControls extends React.Component<{}, GeneratorControlsState> {
    constructor(props: any) {
        super(props)

        this.state = {
            rows: 1000,
            exportFormat: ExportFormat.SQL
        }

        this.onRowsChange = this.onRowsChange.bind(this)
        this.onExportFormatChange = this.onExportFormatChange.bind(this)
    }

    onRowsChange({ currentTarget: { value }}: any) {
        this.setState({ ...this.state, rows: value})
    }

    onExportFormatChange({ currentTarget: { value }}: any) {
        this.setState({ ...this.state, exportFormat: value })
    }

    downloadData() {
        console.log("TODO: donwloadData")
    }

    previewData() {
        console.log("TODO: previewData")
    }

    render() {
        return (
            <Container>
                <Form>
                    <Row className="mt-4" style={{alignItems: "end"}}>
                        <Col xs={"auto"} as="label" htmlFor="generatorForm.rows">Rows:</Col>
                        <Col>
                            <Form.Control
                                id="generatorForm.rows"
                                type="number"
                                defaultValue={1000}
                                min={1}
                                onChange={this.onRowsChange}/>
                        </Col>
                        <Col xs={"auto"} as="label" htmlFor="generatorForm.exportFormat">Export Format:</Col>
                        <Col>
                            <Form.Control id="generatorForm.exportFormat" as="select">
                                { Object.values(ExportFormat).map((format) => 
                                    (<option value={format} key={format}>{format}</option>))
                                }
                            </Form.Control>
                        </Col>
                        <Col xs={"auto"}>
                            <Button type="submit" variant="success" onClick={this.downloadData}>Download Data</Button>
                        </Col>
                        <Col xs={"auto"}>
                            <Button type="submit" variant="primary" onClick={this.previewData}>Preview</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        )
    }
}