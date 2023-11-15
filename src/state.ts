import { Signal, signal } from '@preact/signals'
import Route from 'route-event'
import { TriplitClient } from '@triplit/client'
import Debug from '@nichoth/debug'

const debug = Debug()

type Todo = { text:string, completed:boolean }

/**
 * Setup state
 *   - routes
 *   - create DB instance
 */
export async function State ():Promise<{
    route:Signal<string>;
    count:Signal<number>;
    _setRoute:(path:string)=>void;
    _client:InstanceType<typeof TriplitClient>
}> {  // eslint-disable-line indent
    const onRoute = Route()
    const client = new TriplitClient()

    // Define a query
    const completedTodosQuery = client
        .query('todos')
        .where('completed', '=', true)
        .build()

    // Insert data
    await client.insert('todos', { text: 'Buy milk', completed: true })
    await client.insert('todos', { text: 'Buy eggs', completed: false })
    await client.insert('todos', { text: 'Buy bread', completed: true })

    // Execute the query
    const completedTodos = await client.fetch(completedTodosQuery)
    debug('completed todos', completedTodos)

    // const unsubscribe = client.subscribe(completedTodosQuery, (data) => {

    // Subscribe to query result updates
    client.subscribe(completedTodosQuery, (data) => {
        // do something with data
        debug('in subscription', data)
    })

    const state = {
        _setRoute: onRoute.setRoute.bind(onRoute),
        _client: client,
        todos: signal<Todo[]>([]),
        count: signal<number>(0),
        route: signal<string>(location.pathname + location.search)
    }

    /**
     * set the app state to match the browser URL
     */
    onRoute((path:string) => {
        // for github pages
        const newPath = path.replace('/template-ts-preact-htm/', '/')
        state.route.value = newPath
    })

    return state
}

State.Increase = function Increase (state:Awaited<ReturnType<typeof State>>) {
    state.count.value++
}

State.Decrease = function Decrease (state:Awaited<ReturnType<typeof State>>) {
    state.count.value--
}

State.AddTodo = async function AddTodo (
    state:Awaited<ReturnType<typeof State>>,
    text:string
) {
    const client = state._client
    await client.insert('todos', { text, completed: false })
}
