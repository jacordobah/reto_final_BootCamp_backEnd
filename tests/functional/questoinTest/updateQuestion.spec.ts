import { test } from '@japa/runner'
import { getTokenAuthotization } from '../testAuths'

test('update Question', async ({client, assert}) => { 
    const token = await getTokenAuthotization() 
    let body = {
            "question": "¿se edito test edit?"
    }  
    const response = await client.put('/api/v1/questions/updateQuestion/5').json(body)
        .header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})