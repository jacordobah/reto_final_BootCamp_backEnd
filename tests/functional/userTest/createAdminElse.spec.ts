import { test } from '@japa/runner'
import { getTokenAuthotization } from '../testAuths'

test('create admin else', async ({client, assert}) => { 
    const token = await getTokenAuthotization() 
    let body = {
        "firstName": "jose",
        "secondName": "alb",
        "surname": "cord",
        "secondSurName": "higu",
        "typeDocument": 1,
        "documentNumber": 1034829087,
        "email": "admin1@gmail.co",
        "password":"12345",
        "role":1,
        "phone": "32123126543"
    }  
    const response = await client.post('/api/v1/create-admin').json(body)
        .header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})