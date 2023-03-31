import { test } from '@japa/runner'
import { getTokenAuthotization } from '../testAuths'

test('create question', async ({client, assert}) => { 
    const token = await getTokenAuthotization() 
    let body = {
        "question": "¿paso el test?",
    "options": [
        {
            "opcion":"test",
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
    response.assertStatus(200)
    assert.isObject(response.body())
})