export class FieldDataGenerator {
    
}

export class GeneratorItem {
    constructor(columnName: String, ) {

    }
}

interface GeneratorDescription {
    tables: Array<{ // Purely organizational
        rows: Array<{
            columns: Array<{
                name: string
                pattern: string
            }>
        }>
    }>

}