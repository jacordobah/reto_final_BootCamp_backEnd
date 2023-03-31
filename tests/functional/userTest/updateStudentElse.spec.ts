import { test } from '@japa/runner'
import { getTokenAuthotization } from '../testAuths'

test('update student else', async ({client, assert}) => { 
    const token = await getTokenAuthotization() 
    let body = {
        "firstName": "studen5",
        "secondName": "student5",
        "surname": "cabio",
        "secondSurName": "cabi",
        "typeDocument": 2,
        "documentNumber": 1511111111,
        "email": "student5@coreo.co",
        "phone": "3051234567"
    }  
    const response = await client.put('/api/v1/user/update/80').json(body)
        .header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})