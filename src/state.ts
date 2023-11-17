import { Signal, signal } from '@preact/signals'
import Route from 'route-event'
import { client } from './triplit.js'
import Debug from '@nichoth/debug'

const debug = Debug()

type Todo = { text: string, completed: boolean, id: string }

/**
 * Setup state
 *   - routes
 *   - create DB instance
 */
export async function State (): Promise<{
    route: Signal<string>;
    count: Signal<number>;
    todos: Signal<Record<string, Todo>>
    _setRoute: (path: string) => void;
    _client: typeof client;
}> {  // eslint-disable-line indent
    const onRoute = Route()

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

    const todos = await client.fetch(allTodosQuery)
    debug('todos', todos)
    state.todos.value = Object.entries(todos)

    // const unsubscribe = client.subscribe(completedTodosQuery, (data) => {
    client.subscribe(allTodosQuery, data => {
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

State.AddTodo = async function AddTodo (
    state: Awaited<ReturnType<typeof State>>,
    text: string
) {
    const client = state._client
    await client.insert('todos', {
        created_at: new Date(),
        text,
        completed: false
    })
}

/**
 * Mark an item as complete.
 * @param {Awaited<ReturnType<typeof State>>} state
 * @param {string} id The ID of the item you are updating
 */
State.Complete = async function (
    state: Awaited<ReturnType<typeof State>>,
    id: string
) {
    const client = state._client

    await client.update('todos', id, (entity) => {
        entity.completed = true
    })
}

/**
 * Mark an item an not complete. (Uncheck an item)
 * @param state The state object
 * @param id The id of the todo object
 */
State.Uncomplete = async function (
    state: Awaited<ReturnType<typeof State>>,
    id: string
) {
    const client = state._client

    debug('uncomplete', id)

    await client.update('todos', id, entity => {
        entity.completed = false
    })
}
