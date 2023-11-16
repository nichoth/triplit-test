import { Signal, signal } from '@preact/signals'
import Route from 'route-event'
import Debug from '@nichoth/debug'
import { client } from "./triplit"

const debug = Debug()

type Todo = { text: string, completed: boolean, id: string }

/**
 * Setup state
 *   - routes
 *   - create DB instance
 */
export async function State(): Promise<{
    route: Signal<string>;
    count: Signal<number>;
    todos: Signal<Record<string, Todo>>
    _setRoute: (path: string) => void;
    _client: typeof client;
}> {  // eslint-disable-line indent
    const onRoute = Route()

    // memory
    // https://www.triplit.dev/docs/client-database/storage#memory
    // const client = new TriplitClient({
    //     storage: 'memory',
    // })

    // indexedDB + local serverside DB
    // https://www.triplit.dev/docs/client-database/storage#indexeddb
    // const client = new TriplitClient({
    //     storage: 'indexeddb',
    //     serverUrl: 'http://localhost:6543',
    //     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ4LXRyaXBsaXQtdG9rZW4tdHlwZSI6ImFub24iLCJ4LXRyaXBsaXQtcHJvamVjdC1pZCI6ImxvY2FsLXByb2plY3QtaWQifQ.JzN7Erur8Y-MlFdCaZtovQwxN_m_fSyOIWNzYQ3uVcc'
    // })

    // indexedDB + cloud server
    // https://console.triplit.dev/?collectionName=my-collection
    // const client = new TriplitClient({
    //     schema,
    //     storage: 'indexeddb',
    //     serverUrl: 'https://dc14e3bd-f958-4842-876c-79b97de70db7.triplit.io',
    //     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ4LXRyaXBsaXQtdG9rZW4tdHlwZSI6InNlY3JldCIsIngtdHJpcGxpdC1wcm9qZWN0LWlkIjoiZGMxNGUzYmQtZjk1OC00ODQyLTg3NmMtNzliOTdkZTcwZGI3IiwiaWF0IjoxNzAwMDc1MTY2fQ.zR5Rz-1nERVjflEg42at5XYrawWNUxrAuQ64ETrCP-0'
    // })

    // Define a query
    // const completedTodosQuery = client
    //     .query('todos')
    //     .where('completed', '=', true)
    //     .build()

    const allTodosQuery = client
        .query('todos')
        .build()

    // Execute the query
    // const completedTodos = await client.fetch(completedTodosQuery)

    const state = {
        _setRoute: onRoute.setRoute.bind(onRoute),
        _client: client,
        todos: signal<Record<string, Todo>>({}),
        count: signal<number>(0),
        route: signal<string>(location.pathname + location.search)
    }

    // const unsubscribe = client.subscribe(completedTodosQuery, (data) => {
    client.subscribe(allTodosQuery, data => {
        debug('in subscription', Object.fromEntries(data))
        state.todos.value = Object.fromEntries(data)
    })

    /**
     * set the app state to match the browser URL
     */
    onRoute((path: string) => {
        const newPath = path.replace('/triplit-test/', '/')  // for github pages
        state.route.value = newPath
    })

    return state
}

State.Increase = function Increase(state: Awaited<ReturnType<typeof State>>) {
    state.count.value++
}

State.Decrease = function Decrease(state: Awaited<ReturnType<typeof State>>) {
    state.count.value--
}

State.AddTodo = async function AddTodo(
    state: Awaited<ReturnType<typeof State>>,
    text: string
) {
    const client = state._client
    await client.insert('todos', { text, completed: false })
}

/**
 * Mark an item as complete.
 * @param {string} id The ID of the item you are updating
 */
State.Complete = async function Complete(
    state: Awaited<ReturnType<typeof State>>,
    id: string
) {
    const client = state._client

    // await client.insert('todos', { text: 'Buy milk', completed: true })
    await client.update('todos', id, (entity) => {
        entity.completed = true
    })
}

State.Uncomplete = async function (
    state: Awaited<ReturnType<typeof State>>,
    id: string
) {
    const client = state._client

    await client.update('todos', id, entity => {
        entity.completed = false
    })
}
