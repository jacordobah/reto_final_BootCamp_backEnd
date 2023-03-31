import { test } from '@japa/runner'
import { getTokenAuthotization } from '../testAuths'

test('create question catch', async ({client, assert}) => { 
    const token = await getTokenAuthotization() 
    let body = {
        "q": 12345,
    "options": [
        {
            "opcion":123,
            "iscorrect":false
        },{
            "opcion":"depronto",
            "iscorrect":false
        },{
            "opcion":"quien sabe",
            "iscorrect":true
        },{
            "opcion":"sip",
            "iscorrect":false
        } ]
    }  
    const response = await client.post('/api/v1/questions/create').json(body)
        .header('Authorization', `Bearer ${token}`)
    response.error()
    assert.isObject(response.body())
})