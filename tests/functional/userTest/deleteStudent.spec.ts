import { test } from '@japa/runner'
import { getTokenAuthotization } from '../testAuths'

test('delete student', async ({client, assert}) => { 
    const token = await getTokenAuthotization() 

    const response = await client.delete('/api/v1/user/delete/10')
        .header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})