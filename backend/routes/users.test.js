const request = require('supertest');
const app = require('../app');

it('GET /users/:userId/viewCart', async () => {
    const res = await request(app).get('/users/6683d618e43ca98d8a18eddf/viewCart');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toEqual("Cart is empty");
});

it('GET /users/addUser', async () => {
    const res = (await request(app).post('/users/addUser').send({
        firstName: 'Jean',
        lastName: 'Jacques'
    }))
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(true);
    expect(res.body.newUser.firstName).toEqual("Jean");
    expect(res.body.newUser.lastName).toEqual("Jacques");
    expect(res.body.newUser.cart).toEqual([]);
    expect(res.body.newUser.trips).toEqual([]);
});