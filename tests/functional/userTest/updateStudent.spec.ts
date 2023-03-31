import { test } from '@japa/runner'
import { getTokenAuthotization } from '../testAuths'

test('update student', async ({client, assert}) => { 
    const token = await getTokenAuthotization() 
    let body = {
        "firstName": "studen2",
        "secondName": "student2",
        "surname": "student2",
        "secondSurName": "student2",
        "typeDocument": 2,
        "documentNumber": 1211111111,
        "email": "student2@coreo.co",
        "phone": "3021234567"
    }  
    const response = await client.put('/api/v1/user/update/2').json(body)
        .header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})