import { test } from '@japa/runner'
import { getTokenAuthotization } from '../testAuths'

test('get questions', async ({client, assert}) => { 
    const token = await getTokenAuthotization()   
    const response = await client.get('/api/v1/questions/getQuestions')
        .header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})