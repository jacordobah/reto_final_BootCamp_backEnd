import { test } from '@japa/runner'
import { getTokenAuthotization } from '../testAuths'

test('create role', async ({client, assert}) => { 
    const token = await getTokenAuthotization() 
    let body = {
        name:"prueba"
    }  
    const response = await client.post('/api/v1/create-role').json(body)
        .header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})