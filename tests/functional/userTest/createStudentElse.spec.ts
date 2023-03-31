import { test } from '@japa/runner'
import { getTokenAuthotization } from '../testAuths'

test('create student else', async ({client, assert}) => { 
    const token = await getTokenAuthotization() 
    let body = {
        "firstName": "studen5",
        "secondName": "student5",
        "surname": "st",
        "secondSurName": "st5",
        "typeDocument": 2,
        "documentNumber": 1211111111,
        "email": "student5@coreo.co",
        "password":"12345",
        "phone": "3051234567"
    }  
    const response = await client.post('/api/v1/user/create').json(body)
        .header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})