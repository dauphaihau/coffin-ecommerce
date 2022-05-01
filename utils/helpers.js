import Cookie from "cookie-cutter";

const slugify = (string) => {
  const a = 'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
  const b = 'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word characters
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

function titleIfy(slug) {
  let words = slug.split('-')
  for (let i = 0; i < words.length; i++) {
    let word = words[i]
    words[i] = word.charAt(0).toUpperCase() + word.slice(1)
  }
  return words.join(' ')
}

const formatPrice = (number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 1);
};

const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  if (type === "colors") {
    unique = unique.flat();
    unique = unique.filter(u => u !== undefined);
  }
  return ["all", ...new Set(unique)];
};

const calculateTotal = (cart) => {
  const total = cart.reduce((acc, next) => {
    const quantity = next.quantity
    acc = acc + JSON.parse(next.price) * quantity
    return acc
  }, 0)
  return total
}

const sumAllProduct = (cart) => cart.reduce((total, element) => total + element.quantity, 0);

const getHeaders = () => {
  const user = JSON.parse(Cookie.get("userInfo"))
  return {
    headers: {
      authorization: `Bearer ${user.token}`
    }
  }
}

const uniqElement = (arr) => {
  return [...new Set(arr.filter((value, index, self) => self.indexOf(value) === index))];
}

const toLower = (value) => {
  if (isString(value)) {
    return value.toLowerCase()
  }
  return value
}

const isEmpty = (obj = {}) => {
  return Object.keys(obj).length === 0
}

const isString = (value) => {
  return typeof value === 'string' || value instanceof String
}

const isNumber = (value) => {
  return typeof value == 'number' && !isNaN(value)
}

const isBoolean = (value) => {
  return value === true || value === false
}

const isNil = (value) => {
  return typeof value === 'undefined' || value === null
}

const isDateString = (value) => {
  if (!isString(value)) return false

  return value.match(/^\d{2}-\d{2}-\d{4}$/)
}

const convertDateString = (value) => {
  return value.substr(6, 4) + value.substr(3, 2) + value.substr(0, 2)
}

const convertType = (value) => {
  if (isNumber(value)) {
    return value.toString()
  }

  if (isDateString(value)) {
    return convertDateString(value)
  }

  if (isBoolean(value)) {
    return value ? '1' : '-1'
  }

  return value
}

const filterRows = (rows, filters) => {
  if (isEmpty(filters)) return rows

  return rows.filter((row) => {
    return Object.keys(filters).every((accessor) => {
      const value = row[accessor]
      const searchValue = filters[accessor]

      if (isString(value)) {
        return toLower(value).includes(toLower(searchValue))
      }

      if (isBoolean(value)) {
        return (searchValue === 'true' && value) || (searchValue === 'false' && !value)
      }

      if (isNumber(value)) {
        return value == searchValue
      }

      return false
    })
  })
}

const sortRows = (rows, sort) => {
  return rows.sort((a, b) => {
    const {order, orderBy} = sort

    if (isNil(a[orderBy])) return 1
    if (isNil(b[orderBy])) return -1

    const aLocale = convertType(a[orderBy])
    const bLocale = convertType(b[orderBy])

    if (order === 'asc') {
      return aLocale.localeCompare(bLocale, 'en', {numeric: isNumber(b[orderBy])})
    } else {
      return bLocale.localeCompare(aLocale, 'en', {numeric: isNumber(a[orderBy])})
    }
  })
}

const paginateRows = (sortedRows, activePage, rowsPerPage) => {
  return [...sortedRows].slice((activePage - 1) * rowsPerPage, activePage * rowsPerPage)
}


export {
  slugify,
  titleIfy,
  formatPrice,
  getUniqueValues,
  sumAllProduct,
  calculateTotal,
  getHeaders,
  uniqElement,
  sortRows,
  paginateRows,
  filterRows,
}
