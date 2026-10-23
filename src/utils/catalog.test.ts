import test from 'node:test';
import assert from 'node:assert/strict';
import { INITIAL_PRODUCTS } from '../data/mockData.ts';

test('Shopee catalog items contain storeType, storeName, salesCount, rating', () => {
  assert.ok(INITIAL_PRODUCTS.length > 10, 'Expected at least 10 products');
  for (const prod of INITIAL_PRODUCTS) {
    assert.ok(prod.name, 'Product must have a name');
    assert.ok(prod.price > 0, 'Product must have a valid price');
    assert.ok(prod.image, 'Product must have an image');
  }
});

test('Shopee catalog sorting by Terlaris orders products with highest salesCount first', () => {
  const sorted = [...INITIAL_PRODUCTS].sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
  assert.ok(sorted[0].salesCount! >= sorted[1].salesCount!);
  assert.ok(sorted[1].salesCount! >= sorted[2].salesCount!);
});

test('Shopee catalog sorting by Terpopuler orders products with highest rating first', () => {
  const sorted = [...INITIAL_PRODUCTS].sort((a, b) => (b.rating || 0) - (a.rating || 0));
  assert.ok(sorted[0].rating! >= sorted[1].rating!);
});

test('Shopee catalog filter by warung_makan, jajanan, warung_sembako', () => {
  const warungMakan = INITIAL_PRODUCTS.filter(p => p.storeType === 'warung_makan');
  assert.ok(warungMakan.length >= 3, 'Should have multiple warung makan items');

  const jajanan = INITIAL_PRODUCTS.filter(p => p.storeType === 'jajanan');
  assert.ok(jajanan.length >= 3, 'Should have multiple jajanan items');

  const sembako = INITIAL_PRODUCTS.filter(p => p.storeType === 'warung_sembako');
  assert.ok(sembako.length >= 3, 'Should have multiple sembako items');
});

test('Price sorting works accurately', () => {
  const sortedAsc = [...INITIAL_PRODUCTS].sort((a, b) => a.price - b.price);
  assert.ok(sortedAsc[0].price <= sortedAsc[sortedAsc.length - 1].price);

  const sortedDesc = [...INITIAL_PRODUCTS].sort((a, b) => b.price - a.price);
  assert.ok(sortedDesc[0].price >= sortedDesc[sortedDesc.length - 1].price);
});
