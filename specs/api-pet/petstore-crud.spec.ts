import { test, expect } from '@playwright/test';
import { request } from 'playwright';


test('Создание сущности @smoke', async () => {
    const context = await request.newContext({
        baseURL: 'https://petstore.swagger.io'
    });
    const response = await context.post('/v2/pet',{
            headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
        },
        data:{
        id: 676767,
        category: {
            id: 5,
            name: "mops"
        },
        name: "Scooby",
        photoUrls: [
            "string"
        ],
        tags: [
            {
                id: 99,
                name: "cute"
            }
        ],
        status: "available"
        }
    });
    const body=await response.json();
    console.log(body);
    expect(response.status()).toBe(200);
    expect(body).toHaveProperty('tags');
    expect(body).toMatchObject({name:'Scooby'});
});
test('Запросить сущность по ID @smoke', async () => {
        const context = await request.newContext({
        baseURL: 'https://petstore.swagger.io'
    });
    const response = await context.get('/v2/pet/676767', {
        headers : {
            accept:'application/json'
        }
    });
    const body = await response.json();
    console.log(body);
    expect(response.ok()).toBeTruthy();
    expect(body).toHaveProperty('id')
});
test('Обновить данные', async ()=>{
    const context = await request.newContext({
        baseURL:'https://petstore.swagger.io'
    });
    const response = await context.put('/v2/pet', {
                    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
        },
        data:{
        id: 676767,
        category: {
            id: 5,
            name: "mops"
        },
        name: "Scooby",
        photoUrls: [
            "string"
        ],
        tags: [
            {
                id: 99,
                name: "cute"
            }
        ],
        status: "pending"
        }
    });
    const body = await response.json();
    console.log(body);
    expect(body).toHaveProperty('category');
    expect(body).toMatchObject({status:'pending'});
});
test('Удалить сущность', async () => {
    const context = await request.newContext({
        baseURL:'https://petstore.swagger.io'
    });
    const response = await context.delete('/v2/pet/676767', {
        headers:{
            'accept': 'application/json',
            'api-key': 'special-key'
        }
    });
    const body= await response.json();
    console.log(body);
    expect(body).toMatchObject({message:'676767'});
    expect(response.ok()).toBeTruthy();
    expect(body).toHaveProperty('type')
});