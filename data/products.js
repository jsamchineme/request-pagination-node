const faker = require('faker');

const products = [];

for(let i = 0; i < 103; i++) {
  const product = {
    id: i + 1,
    name: faker.random.words(4)
  }

  products.push(product);
}

export default products;