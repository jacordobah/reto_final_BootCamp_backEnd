import { test } from '@japa/runner'
import { getTokenAuthotization } from '../testAuths'

test('delete question', async ({client, assert}) => { 
    const token = await getTokenAuthotization() 

    const response = await client.delete('/api/v1/questions/deleteQuestion/7')
        .header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})