import { test } from '@japa/runner'
import { getTokenAuthotization } from '../testAuths'

test('get student', async ({client, assert}) => { 
    const token = await getTokenAuthotization() 
   
    const response = await client.get('/api/v1/user/getUser/2')
        .header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isArray(response.body())
})