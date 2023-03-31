import { test } from '@japa/runner'
import { getTokenAuthotization } from '../testAuths'

test('create role cathc', async ({client, assert}) => { 
    const token = await getTokenAuthotization() 
    let body = {
        n: 1
    }  
    const response = await client.post('/api/v1/create-role').json(body)
        .header('Authorization', `Bearer ${token}`)
    response.error()
    assert.isObject(response.body())
})