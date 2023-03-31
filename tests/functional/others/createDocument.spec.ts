import { test } from '@japa/runner'
import { getTokenAuthotization } from '../testAuths'

test('create document', async ({client, assert}) => { 
    const token = await getTokenAuthotization() 
    let body = {
        name:"PPT"
    }  
    const response = await client.post('/api/v1/create-type-document').json(body)
        .header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})