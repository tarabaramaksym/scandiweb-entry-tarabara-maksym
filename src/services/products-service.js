import { client, Field, Query } from "@tilework/opus";

const endPoint = "http://localhost:4000/";
client.setEndpoint(endPoint);

export const fetchCategories = async () => {
  const query = new Query('categories').addField('name');
  const result = await client.post(query);
  return result;
}

// returns all fields for Product, function is needed as we use it in a couple of places
// DRY
const getProductFieldList = () => {
  const attributeFields = ['id', 'displayValue', 'value'];
  const currencyFields = ['label', 'symbol'];
  const attributeSetFields = ['id', 'name', 'type', new Field('items', true).addFieldList(attributeFields)]
  const priceFields = [new Field('currency').addFieldList(currencyFields), 'amount'];

  const productFields = ['id', 'name', 'inStock', 'gallery', 'description', 'category',
    new Field('attributes', true).addFieldList(attributeSetFields),
    new Field('prices').addFieldList(priceFields),
    'brand'];

  return productFields
}

export const fetchProducts = async (categoryName) => {
  const query = new Query('category')
    .addArgument('input', 'CategoryInput', { title: categoryName })
    .addFieldList(['name', new Field('products', true).addFieldList(getProductFieldList())]);

  const result = await client.post(query);
  return result.category.products;
}

export const fetchProduct = async (productId) => {
  const query = new Query('product').addArgument('id', 'String!', productId).addFieldList(getProductFieldList());
  const result = await client.post(query);
  return result.product;
}

export const fetchCurrencies = async () => {
  const query = new Query('currencies').addFieldList(['label', 'symbol']);
  const result = await client.post(query);
  return result.currencies;
}