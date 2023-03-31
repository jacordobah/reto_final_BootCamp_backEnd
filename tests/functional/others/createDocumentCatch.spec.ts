import { test } from '@japa/runner'
import { getTokenAuthotization } from '../testAuths'

test('create document cathc', async ({client, assert}) => { 
    const token = await getTokenAuthotization() 
    let body = {
        name: "permiso de proteccion temporal ppt",
    }  
    const response = await client.post('/api/v1/create-type-document').json(body)
        .header('Authorization', `Bearer ${token}`)
    response.error()
    assert.isObject(response.body())
})