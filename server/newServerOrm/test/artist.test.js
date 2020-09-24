const request = require('supertest');
const { Artist } = require('../models');

const mock = [
    {name: 'amir'},
    {name: 'shahar'}
]

describe('testing artists endpoint', () => {
    beforeEach(async () => {
        await Artist.destroy({ truncate: true, force: true });
      });    
    it("get all artist",async ()=>{
       const results= await Artist.bulkCreate(mock)
        expect(results.length).toBe(2)
        expect(results[0].name).toBe("amir")
        expect(results[1].name).toBe("shahar")
    })
})
