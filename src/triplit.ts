import { TriplitClient } from '@triplit/client'
import { schema } from '../triplit/schema.js'

export const client = new TriplitClient({
    schema,
    storage: 'indexeddb',
    serverUrl: 'http://localhost:6543',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ4LXRyaXBsaXQtdG9rZW4tdHlwZSI6ImFub24iLCJ4LXRyaXBsaXQtcHJvamVjdC1pZCI6ImxvY2FsLXByb2plY3QtaWQifQ.JzN7Erur8Y-MlFdCaZtovQwxN_m_fSyOIWNzYQ3uVcc'
})

/**
 * memory
 */
// https://www.triplit.dev/docs/client-database/storage#memory
// const client = new TriplitClient({
//     storage: 'memory',
// })

/**
 * indexedDB + local serverside DB
 */
// https://www.triplit.dev/docs/client-database/storage#indexeddb
// const client = new TriplitClient({
//     storage: 'indexeddb',
//     serverUrl: 'http://localhost:6543',
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ4LXRyaXBsaXQtdG9rZW4tdHlwZSI6ImFub24iLCJ4LXRyaXBsaXQtcHJvamVjdC1pZCI6ImxvY2FsLXByb2plY3QtaWQifQ.JzN7Erur8Y-MlFdCaZtovQwxN_m_fSyOIWNzYQ3uVcc'
// })

/**
 * indexedDB + cloud server
 */
// https://console.triplit.dev/?collectionName=my-collection
// const client = new TriplitClient({
//     schema,
//     storage: 'indexeddb',
//     serverUrl: 'https://dc14e3bd-f958-4842-876c-79b97de70db7.triplit.io',
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ4LXRyaXBsaXQtdG9rZW4tdHlwZSI6InNlY3JldCIsIngtdHJpcGxpdC1wcm9qZWN0LWlkIjoiZGMxNGUzYmQtZjk1OC00ODQyLTg3NmMtNzliOTdkZTcwZGI3IiwiaWF0IjoxNzAwMDc1MTY2fQ.zR5Rz-1nERVjflEg42at5XYrawWNUxrAuQ64ETrCP-0'
// })
