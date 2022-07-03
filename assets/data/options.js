import {
  PRODUCT_BRAND_OPTIONS,
  PRODUCT_CATEGORIES_OPTIONS,
  PRODUCT_COLOR_OPTIONS, PRODUCT_TAGS_OPTIONS,
} from "../../utils/enums";
import {capitalize} from "../../utils/helpers";

const productBrandOptions = Object.keys(PRODUCT_BRAND_OPTIONS).map(key => ({
  label: capitalize(PRODUCT_BRAND_OPTIONS[key]),
  value: PRODUCT_BRAND_OPTIONS[key]
}))
const productColorOptions = Object.keys(PRODUCT_COLOR_OPTIONS).map(key => ({
  label: capitalize(PRODUCT_COLOR_OPTIONS[key]),
  value: PRODUCT_COLOR_OPTIONS[key]
}))
const productCategoriesOptions = Object.keys(PRODUCT_CATEGORIES_OPTIONS).map(key => ({
  label: capitalize(PRODUCT_CATEGORIES_OPTIONS[key]),
  value: PRODUCT_CATEGORIES_OPTIONS[key]
}))
const productTagsOptions = Object.keys(PRODUCT_TAGS_OPTIONS).map(key => ({
  label: capitalize(PRODUCT_TAGS_OPTIONS[key]),
  value: PRODUCT_TAGS_OPTIONS[key]
}))

const sortOpts = [
  {
    value: '',
    label: 'Sort Options',
  },
  {
    value: 'price-lowest',
    label: 'price (lowest)',
  },
  {
    value: 'price-highest',
    label: 'price (highest)',
  },
  {
    value: 'name-a',
    label: 'name (a-z)',
  },
  {
    value: 'name-z',
    label: 'name (z-a)',
  },
]


const deliveryOpts = [
  {
    value: 'slowDelivery',
    name: 'Standard delivery (Free)',
    description: 'Delivered on Monday, August 12',
  },
  {
    value: 'fastDelivery',
    name: 'Fast delivery ($2,00)',
    description: 'Delivered on Monday, August 5',
  },
]

const paymentOpts = [
  {
    value: 'card',
    name: 'Credit / Debit Card',
    description: 'We support Mastercard, Visa, Discover and Stripe.',
  },
  {
    value: 'cash',
    name: 'Cash on Checkout Delivery',
    description: 'Pay with cash when your order is delivered.',
  },
]


const rowsPerPageOpts = [
  {
    value: '5',
    label: '5',
  },
  {
    value: '10',
    label: '10',
  },
  {
    value: '25',
    label: '25',
  },
]


const orderByOpts = [
  {
    label: 'Ascend',
    value: 'asc',
  },
  {
    label: 'Descend',
    value: 'desc',
  },
];
const searchByOptsProducts = [
  {
    label: 'Name',
    value: 'name',
  },
  {
    label: 'SKU',
    value: 'sku',
  },
  {
    label: 'Price',
    value: 'price',
  },
  {
    label: 'Quantity',
    value: 'quantity',
  },
];


export {
  orderByOpts, searchByOptsProducts,
  productCategoriesOptions, productBrandOptions, productColorOptions,
  productTagsOptions,
  sortOpts, deliveryOpts,
  paymentOpts, rowsPerPageOpts,
}
