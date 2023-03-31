import { test } from '@japa/runner'
import { getTokenAuthotization } from '../testAuths'

test('delete student catch', async ({client, assert}) => { 
    const token = await getTokenAuthotization() 

    const response = await client.delete('/api/v1/user/delete/und')
        .header('Authorization', `Bearer ${token}`)
    response.error()
    assert.isObject(response.body())
})