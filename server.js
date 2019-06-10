import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import products from './data/products';

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/products', (req, res) => {
  const total = products.length;
  const pageSize = Number(req.query.pageSize) || 20;
  const page = Number(req.query.page) || 1;
  const initialSerial = 0;
  const offset = (pageSize * (page - 1)) + initialSerial;

  const pageData = [];
  const lastIndex = offset + Number(pageSize);

  const lastPage = Math.ceil(total / pageSize);

  for(let a=offset; a < lastIndex; a++) {
    const product = products[a];
    if(product) {
      pageData.push(product);
    }
  }

  const previousPage = page !== 1 ? page - 1 : null;
  const nextPage = page < lastPage ? page + 1 : null;

  const meta = {
    lastPage,
    previousPage,
    nextPage,
    total,
  }

  return res.status(200).send({
    data: pageData,
    meta
  });
});


const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`app listening on port ${port}`));



/**
 * Pagination
 * 
 * Given
 * numberPerPage = 10
 * page 1
 * total = [1 - 100]; 
 * array [0 - 99]
 * initialIndex = 0 | 1;
 * we should have 
 * [0 - 9]
 * 
 * page 2
 * [10 - 19]
 *
 * page 3
 * [20 - 29] 
 * 
 * 
 * page 3
 * 3 - 1 = 2
 * 2 * per page (10) = 20 - initial index
 * 
 * page 2
 * 2 - 1 = 1
 * 1 * per page (10) = 10 - initial index

 *
 * page 1
 * 1 - 1 = 0
 * 0 * per page (10) = 0 - initial index
 *
 * 
 */