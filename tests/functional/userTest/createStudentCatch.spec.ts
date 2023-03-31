import { test } from '@japa/runner'
import { getTokenAuthotization } from '../testAuths'

test('create student catch', async ({client, assert}) => { 
    const token = await getTokenAuthotization() 
    let body = {
        document:"sss"
    }  
    const response = await client.post('/api/v1/user/create').json(body)
        .header('Authorization', `Bearer ${token}`)
    response.error()
    assert.isObject(response.body())
})