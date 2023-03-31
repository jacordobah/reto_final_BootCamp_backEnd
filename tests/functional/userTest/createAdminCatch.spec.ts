import { test } from '@japa/runner'
import { getTokenAuthotization } from '../testAuths'

test('create admin cathc', async ({client, assert}) => { 
    const token = await getTokenAuthotization() 
    let body = {
        document:"sss"
    }  
    const response = await client.post('/api/v1/create-admin').json(body)
        .header('Authorization', `Bearer ${token}`)
    response.error()
    assert.isObject(response.body())
})