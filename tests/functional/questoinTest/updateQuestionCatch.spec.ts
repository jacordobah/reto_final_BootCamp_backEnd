import { test } from '@japa/runner'
import { getTokenAuthotization } from '../testAuths'

test('update Question catch', async ({client, assert}) => { 
    const token = await getTokenAuthotization() 
    let body = {
            questiones:123456
    }  
    const response = await client.put('/api/v1/questions/updateQuestion/7').json(body)
        .header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})