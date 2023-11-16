import { TriplitClient, Schema as S } from "@triplit/client";
import { schema } from '../triplit/schema';

export const client = new TriplitClient({
    schema
});