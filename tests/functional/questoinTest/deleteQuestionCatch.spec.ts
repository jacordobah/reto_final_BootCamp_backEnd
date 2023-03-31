import { test } from '@japa/runner'
import { getTokenAuthotization } from '../testAuths'

test('delete question catch', async ({client, assert}) => { 
    const token = await getTokenAuthotization() 

    const response = await client.delete('/api/v1/questions/deleteQuestion/a')
        .header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})