import {test, expect} from '@playwright/test';

test('Создание покупателя', async ({request}) => {
    const newCustomer = await request.post('/wp-json/wc/v3/customers', {
    headers: {
      'Authorization': 'Basic Y2tfMzc5YjAyMDVlMzIxMTZiYTY3M2FmOTcxZDVmODFkMzJmYjE2N2UzNTpjc18wMmU1YmQwYWQyNTBmYWViMWVjYThjZjVkZWFhN2U4OTZkZWQwNTlh',
    },
    data: {
    email: "zigmundFreid@mail.ru",
    first_name: "Zigmund",
    last_name: "Freid",
    role: 'user',
    username: 'ZigmundFreid',
    password: "Zigmund67!",
    confirm_password: "Zigmund67!",
    },
  });
  const body =  await newCustomer.json();
  console.log(body);
  expect(newCustomer.status()).toBeTruthy();
  expect(body).toHaveProperty('id');
});

test('Запрос покупателя', async ({request})=> {
    const getCustomer = await request.get('/wp-json/wc/v3/customers/5', {
         headers: {
      'Authorization': 'Basic Y2tfMzc5YjAyMDVlMzIxMTZiYTY3M2FmOTcxZDVmODFkMzJmYjE2N2UzNTpjc18wMmU1YmQwYWQyNTBmYWViMWVjYThjZjVkZWFhN2U4OTZkZWQwNTlh',
    },
  });   
  const body = await getCustomer.json();
  console.log(body);
  expect(getCustomer.status()).toBe(200);
  expect(body).toHaveProperty('username');
});

test('Изменение покупателя', async ({request}) => {
    const putCustomer = await request.put('/wp-json/wc/v3/customers/5', {
    headers: {
      'Authorization': 'Basic Y2tfMzc5YjAyMDVlMzIxMTZiYTY3M2FmOTcxZDVmODFkMzJmYjE2N2UzNTpjc18wMmU1YmQwYWQyNTBmYWViMWVjYThjZjVkZWFhN2U4OTZkZWQwNTlh',
    },
    data: {
    billing: {
    city: 'Moscow',
    postcode: '123987',
    country: 'Russia',
    phone: "+71239879870"
  },
    },
  });
  const body =  await putCustomer.json();
  console.log(body);
  expect(putCustomer.status()).toBeTruthy();
  expect(body).toHaveProperty('billing');
});