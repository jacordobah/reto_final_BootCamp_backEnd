import { test } from '@japa/runner'
import { getTokenAuthotization } from '../testAuths'

test('get Options of question', async ({client, assert}) => { 
    const token = await getTokenAuthotization()   
    const response = await client.get('/api/v1/questions/getOptions/2')
        .header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})