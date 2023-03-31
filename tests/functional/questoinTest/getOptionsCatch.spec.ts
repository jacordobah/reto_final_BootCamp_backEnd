import { test } from '@japa/runner'
import { getTokenAuthotization } from '../testAuths'

test('get options catch of question', async ({client, assert}) => { 
    const token = await getTokenAuthotization()   
    const response = await client.get('/api/v1/questions/getOptions/a2')
        .header('Authorization', `Bearer ${token}`)
    response.error()
    assert.isObject(response.body())
})