const brandOpts = [

  {
    value: 'aurora',
    label: 'Aurora',
  },
  {
    value: 'batesville',
    label: 'Batesville',
  },
  {
    value: 'astral',
    label: 'Astral',
  },
]

const colorOpts = [
  {
    value: 'light-gray',
    label: 'Light Gray',
  },
  {
    value: 'light-brown',
    label: 'Light Brown',
  },
  {
    value: 'dark-brown',
    label: 'Dark Brown',
  },
  {
    value: 'cream',
    label: 'Cream',
  },
]

const categoryOpts = [
  {
    value: 'natural material coffin',
    label: 'Natural material coffin',
  },
  {
    value: 'american caskets',
    label: 'American caskets',
  },
  {
    value: 'traditional',
    label: 'Traditional',
  },
]

const roleOpts = [
  {
    value: 'staff',
    label: 'Staff',
  },
  {
    value: 'manager',
    label: 'Manager',
  },
  {
    value: 'admin',
    label: 'Admin',
  },
  {
    value: 'customer',
    label: 'Customer',
  },
]

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


const TagOpts = [
  {id: 1, name: 'Coffin'},
  {id: 2, name: 'Casket'},
  {id: 3, name: 'Death'},
  {id: 4, name: 'Die'},
  {id: 5, name: 'Willow'},
  {id: 6, name: 'Curved'},
]

export {
  colorOpts, categoryOpts,
  brandOpts, roleOpts, sortOpts, deliveryOpts,
  paymentOpts, TagOpts
}
