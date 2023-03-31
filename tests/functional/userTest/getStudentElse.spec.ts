import { test } from '@japa/runner'
import { getTokenAuthotization } from '../testAuths'

test('get student else', async ({client, assert}) => { 
    const token = await getTokenAuthotization() 
   
    const response = await client.get('/api/v1/user/getUser/50')
        .header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})