import { fetchInventory } from './provider/inventoryProvider'

function inventoryByCategory (inventory) {
  return inventory.reduce((acc, next) => {
    const categories = next.categories
    categories.forEach(c => {
      if (acc[c]) {
        acc[c].items.push(next)
      } else {
        acc[c] = {}
        acc[c].items = []
        acc[c].items.push(next)
      }
    })
    return acc
  }, {})
}

async function inventoryForCategory (category) {
  const inventory = await fetchInventory()
  const byCategory = inventoryByCategory(inventory)
  return byCategory[category]?.items
}
export default inventoryForCategory
