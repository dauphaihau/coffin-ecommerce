// currency
const DENOMINATION = '$'
const STORAGE_KEY = 'COFFIN_ECOMMERCE'

export enum USER_STATUS {NOT_ACTIVATED = -1, LOCKED, ACTIVE}

export enum ROLE_OPTIONS {
  CUSTOMER,
  STAFF,
  MANAGER,
  ADMIN,
}

export enum PRODUCT_BRAND_OPTIONS {
  AURORA = 'aurora',
  BATESVILLE = 'batesville',
  ASTRAL = 'astral',
}

export enum PRODUCT_COLOR_OPTIONS {
  LIGHT_GRAY = 'light-gray',
  LIGHT_BROWN = 'light-brown',
  DARK_BROWN = 'dark-brown',
  CREAM = 'cream',
}

export enum PRODUCT_CATEGORIES_OPTIONS {
  NATURAL_MATERIAL_COFFIN = 'natural material coffin',
  AMERICAN_CASKETS = 'american caskets',
  TRADITIONAL = 'traditional',
}

export enum PRODUCT_TAGS_OPTIONS {
  COFFIN = 'coffin',
  CASKET = 'casket',
  DEATH = 'death',
  DIE = 'die',
  WILLOW = 'willow',
  CURVED = 'curved',
}

export {
  DENOMINATION, STORAGE_KEY
}
