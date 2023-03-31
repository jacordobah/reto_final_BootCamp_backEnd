import { test } from '@japa/runner'
import { getTokenAuthotization } from '../testAuths'

test('create document else', async ({client, assert}) => { 
    const token = await getTokenAuthotization() 
    let body = {
        name: "cedula"
    }  
    const response = await client.post('/api/v1/create-type-document').json(body)
        .header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})