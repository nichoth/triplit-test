import { Schema as S } from '@triplit/db'

/**
 * When you add this to the client contructor below,
 * it breaks intellisense in VSCode
 */
export const schema = {
    todos: {
        schema: S.Schema({
            id: S.Id(),
            text: S.String(),
            complete: S.Boolean(),
            created_at: S.Date(),
            tags: S.Set(S.String()),
        }),
    },
    users: {
        schema: S.Schema({
            id: S.Id(),
            name: S.String(),
            address: S.Record({
                street: S.String(),
                city: S.String(),
                state: S.String(),
                zip: S.String(),
            }),
        }),
    },
}
