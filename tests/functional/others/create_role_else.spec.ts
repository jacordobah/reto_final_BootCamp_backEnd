import { test } from '@japa/runner'
import { getTokenAuthotization } from '../testAuths'

test('create role else', async ({client, assert}) => { 
    const token = await getTokenAuthotization() 
    let body = {
        name:"estudiante"
    }  
    const response = await client.post('/api/v1/create-role').json(body)
        .header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})