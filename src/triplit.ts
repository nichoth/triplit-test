import { TriplitClient } from '@triplit/client'
import { schema } from '../triplit/schema.js'

export const client = new TriplitClient({
    schema
})
