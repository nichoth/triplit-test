import { Models, Schema as S } from '@triplit/db'

export const schema = {
    todos: {
        schema: S.Schema({
            id: S.Id(),
            text: S.String(),
            completed: S.Boolean(),
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
} satisfies Models<any, any>
