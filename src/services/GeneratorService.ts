import Database from "../types/model_structure/database";
import Field from "../types/model_structure/field";
import Table from "../types/model_structure/table";

interface TableData {
    table: Table
    data: FieldData[][]
}

interface FieldData {
    field: Field
    value: any
}

export default class GeneratorService {
    private tableData: { [name: string]: TableData } = {}

    generateData(database: Database, rows: number) {
        for (let i = 0; i < rows; i++) {
            database.schemas.forEach(schema => {
                const sortedTables = this.sortForGeneration(schema.tables)
                sortedTables.forEach(table => {

                    // Does this actually work? Check when sober
                    let tableEntry = this.tableData[table.name]
                    if (tableEntry) {
                        // TODO: Concat actual data
                        tableEntry.data.concat([])
                    } else {
                        this.tableData[table.name] = { table, data: [] }
                    }
                })
            })
        }
    }

    sortForGeneration(tables: Table[]): Table[] {
        return tables.sort((tableA, tableB) => {
            const tableAHasRefs = tableA.fields.every(field => field.endpoints.length > 0)
            const tableBHasRefs = tableB.fields.every(field => field.endpoints.length > 0)

            if (!tableAHasRefs && !tableBHasRefs) {
                return 0
            } else if (tableAHasRefs && !tableBHasRefs) {
                return 1
            } else if (!tableAHasRefs && tableBHasRefs) {
                return -1
            } else {
                // Both tables have refs
                let aReferencesB = this.findTableReferences(tableA, tableB)
                let bReferencesA = this.findTableReferences(tableB, tableA)

                if (aReferencesB && bReferencesA) {
                    // TODO: Throw an error
                    return 0
                } else if (!aReferencesB && !bReferencesA) {
                    return 0
                } else if (aReferencesB && !bReferencesA) {
                    return 1
                } else {
                    // A references B but B doesn't reference A
                    return -1
                }
            }
        })
    }

    /**
     * Determine whether tableA has any fields that reference tableB
     * @param tableA The source table
     * @param tableB The table to check for references to
     */
    findTableReferences(tableA: Table, tableB: Table): boolean {
        return tableA.fields.some(({ endpoints }) => {
            endpoints.some(({ fields }) => {
                // TODO: Support composite foreign keys
                const fieldName = fields[0].name
                return tableB.findField(fieldName)
            })
        })
    }

    /**
     * Generate data for a field
     * @param field The field to generate data for
     */
    generateField(field: Field): FieldData {
        if (field.endpoints.length > 0) {
            field.endpoints.forEach(endpoint => {
                if (endpoint.relation === '*') {
                    console.log(`${field.table.name}.${field.name} references other field(s)`)
                    // TODO: Support composite foreign keys
                    return this.generateDependentField(field, endpoint.fields[0])
                }
            })
        }

        return <FieldData>{}
    }

    generateDependentField(field: Field, referencedField: Field): FieldData | undefined {
        const referenceFieldData = this.tableData[referencedField.table.name]
        if (!referenceFieldData) {
            // Can't create linked data because there isn't any to link to
            return undefined
        }

        let value: any
        // If it's a 1-1 relationship
            value = referenceFieldData.data[-1][-1]
        // If it's a *-1 relationship
            // Choose a random datapoint
            const min = 0
            const max = referenceFieldData.data[-1].length
            const randomIndex = Math.floor(Math.random() * (max - min) + min)
            value = referenceFieldData.data[-1][randomIndex]
        return <FieldData>{ field, value }
    }
}