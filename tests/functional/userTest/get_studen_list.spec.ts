import { test } from '@japa/runner'
import { getTokenAuthotization } from '../testAuths'

test('get student list', async ({client, assert}) => { 
    const token = await getTokenAuthotization()   
    const response = await client.get('/api/v1/user/getUsers')
        .header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})