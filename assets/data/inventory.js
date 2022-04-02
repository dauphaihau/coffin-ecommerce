import {v4 as uuid} from 'uuid'

let inventory = [
  {
    categories: ['american caskets'],
    name: 'Autumn Oak Hardwood',
    price: '2500',
    image: '/images/products/coffin3.png',
    description: ' Premium Traditional American Coffin Casket hardwood Oak, manufactured in the USA, White cream interior with side pleated panel and Stationary hardware and handles . Beautifully lined in cream velvetAdjustable bed and mattressPlease notify us if you require a name and message to be added to the outside of the coffin.',
    brand: 'Manufacturers',
    currentInventory: 3
  },
  {
    categories: ['american caskets'],
    name: 'Trinity Oak',
    price: '2100',
    salePrice: '2000',
    image: '/images/products/coffin6.png',
    description: 'Premium Traditional American Coffin Casket hardwood Oak, manufactured in the USA, White cream interior with side pleated panel and Stationary hardware and handles . Beautifully lined in cream velvet and single panel lidAdjustable bed and mattressPlease notify us if you require a name and message to be added to the outside of the coffin.',
    brand: 'Manufacturers',
    currentInventory: 10
  },
  {
    categories: ['american caskets'],
    name: 'White Chased Solid Wood',
    price: '2845',
    salePrice: '2600',
    image: '/images/products/coffin7.png',
    description: ' Traditional American Casket, manufactured in USA from Solid Hardwood timber, finished in White with metal handlesAdjustable bed and mattressPlease notify us if you require a name and message to be added to the outside of the coffin.',
    brand: 'Manufacturers',
    currentInventory: 12
  },
  {
    categories: ['american caskets'],
    name: 'Last Supper Hardwood',
    price: '2245',
    salePrice: '2100',
    image: '/images/products/coffin8.png',
    description: ' Premium Traditional Last Supper American Coffin Casket hardwood Mahogany, manufactured in the USA, White cream interior with side pleated panel and Stationary hardware and handles . Beautifully lined in cream velvet . An insert panel can be installed at an extra cost .Adjustable bed and mattress',
    brand: 'Manufacturers',
    currentInventory: 1
  },
  {
    categories: ['natural material coffin'],
    name: 'Willow Pod Coffin',
    price: '550',
    salePrice: '580',
    image: '/images/products/coffin14.png',
    description: 'Stay a while. The Timber charme chocolat sofa is set atop an oak trim and flaunts fluffy leather back and seat cushions. Over time, this brown leather sofa’s full-aniline upholstery will develop a worn-in vintage look. Snuggle up with your cutie (animal or human) and dive into a bowl of popcorn. This sofa is really hard to leave. Natural color variations, wrinkles and creases are part of the unique characteristics of this leather. It will develop a relaxed vintage look with regular use.',
    brand: 'Jason Bourne',
    currentInventory: 1
  },
  {
    categories: ['traditional coffin'],
    name: 'Traditional Wreath Mould Lid and Side Coffin',
    price: '445',
    image: '/images/products/coffin2.png',
    description: 'Traditional British Coffin hand crafted in the UK, from Quality oak veneer. Excellent finish, simple lines and classic design. Includes handles, coffin Liner and Name plate. All traditional coffins are available in the following Wood Stains: Dark Oak, Light Oak, Mahogony, Mid Oak, and Rose Click here to review all the wood stain colours we have to choose from',
    brand: 'Jason Bourne',
    currentInventory: 2
  },
  {
    categories: ['traditional coffin'],
    name: 'Traditional Box Lid Coffin',
    price: '425',
    image: '/images/products/coffin16.png',
    description: 'Traditional British Coffin hand crafted in the UK, from Quality oak veneer. Excellent finish, simple lines and classic design. Includes handles, coffin Liner and Name plate. All traditional coffins are available in the following Wood Stains: Dark Oak, Light Oak, Mahogony, Mid Oak, and Rose Click here to review all the wood stain colours we have to choose from',
    brand: 'Jason Bourne',
    currentInventory: 20
  },
  {
    categories: ['traditional coffin'],
    name: 'Traditional High raised Lid Coffin',
    price: '535',
    salePrice: '500',
    image: '/images/products/coffin15.png',
    description: 'Traditional British Coffin hand crafted in the UK, from Quality oak veneer. Excellent finish, simple lines and classic design. Includes handles, coffin Liner and Name plate. All traditional coffins are available in the following Wood Stains: Dark Oak, Light Oak, Mahogony, Mid Oak, and Rose Click here to review all the wood stain colours we have to choose from',
    brand: 'Jason Bourne',
    currentInventory: 6
  },
  {
    categories: ['traditional coffin'],
    name: 'Premium Traditional Casket',
    price: '795',
    image: '/images/products/coffin17.png',
    description: 'Traditional British Coffin hand crafted in the UK, from Quality oak veneer. Excellent finish, simple lines and extra design detailing on the lid which adds definition to the top of the coffin. Includes handles, coffin Liner and blank Nameplate. The casket is suitable for burial or cremation All traditional coffins are available in the following Wood Stains: Dark Oak, Light Oak, Mahogony, Mid Oak, and Rose Wood Click here to review all the wood stain colours we have to choose from',
    brand: 'Jason Bourne',
    currentInventory: 2
  },
  {
    categories: ['natural material coffin', 'bamboo coffin'],
    name: 'Willow Rounded Coffin',
    price: '505',
    salePrice: '450',
    image: '/images/products/coffin9.png',
    description: 'This beautifully made Willow Rounded coffin is a similar to the Willow traditional but with rounded ends. The willow is a deciduous tree found primarily on moist soil in cold and temperate regions. ',
    brand: 'Jason Bourne',
    currentInventory: 2
  },
  {
    categories: ['natural material coffin', 'bamboo coffin'],
    name: 'Bamboo Round Coffin',
    price: '415',
    image: '/images/products/coffin11.png',
    description: 'The Bamboo Rounded Coffin is similar to the traditional but with rounded ends. Bamboo comes from a group of perennial evergreen plants in the grass family, and is the fastest growing plant in the world. Produced in a UK owned Fair Trade company in China. Made from 100% natural materials. Includes cotton liner and name plate.',
    brand: 'Jason Bourne',
    currentInventory: 2
  },
  {
    categories: ['natural material coffin', 'bamboo coffin'],
    name: 'Bamboo Lattice Round Coffin',
    price: '485',
    image: '/images/products/coffin12.png',
    description: 'The Bamboo Lattice Rounded coffin is constructed of two layers of woven bamboo to give it its distinctive pattern. It is similar to the Bamboo Lattice Traditional coffin with rounded ends. Bamboo comes from a group of perennial evergreen plants in the grass family, and is the fastest growing plant in the world. Produced in a UK owned Fair Trade company in China. Made from 100% natural materials. Includes cotton liner, headrest and name plate.',
    brand: 'Jason Bourne',
    currentInventory: 10
  },
  {
    categories: ['natural material coffin', 'child coffin'],
    name: 'Pine Coffin Casket',
    price: '200',
    salePrice: '180',
    image: '/images/products/coffin-child1.png',
    description: 'The Pine Coffin Casket is made from rapidly growing FSC certified pine from Poland. They grow to 80 metres in height and are among the most commercially important of tree species, valued for their timber and wood pulp throughout the world. Made by a co-operative of cottage industries in Poland using 100% natural materials. Includes cotton liner, headrest and name plate.Please notify us if you require a name and message to be added to the outside of the coffin.',
    brand: 'Jason Bourne',
    currentInventory: 10
  },
  {
    categories: ['natural material coffin', 'child coffin'],
    name: 'Child’s Curved Painted Willow Coffin',
    price: '220',
    image: '/images/products/coffin-child2.png',
    description: 'Our Child’s Curved Painted Willow Coffin features tapered round ends, beautifully plaited edging and natural hand-woven willow handles. We make each Child’s coffins with sensitivity in mind, each one made in our workshops in Somerset using natural willow and using completely natural processes. Every wicker coffin is made with the same care and dedication that has driven our family business for over four generations.',
    brand: 'Jason Bourne',
    currentInventory: 10
  },
  {
    categories: ['natural material coffin', 'child coffin'],
    name: 'Baby Crib Casket',
    price: '160',
    image: '/images/products/coffin-child3.png',
    description: 'Our tiny Baby Crib casket features a gently raised lid with carefully plaited edging and a set of small braided loops with wooden toggles. We make our willow Baby Crib casket with sensitivity in mind, each one made in our workshops in Somerset using natural willow and using completely natural processes. Every wicker casket is made with the same care and dedication that has driven our family business for over four generations.',
    brand: 'Jason Bourne',
    currentInventory: 10
  },
  {
    categories: ['natural material coffin', 'pine coffin'],
    name: 'Child’s Curved Buff Willow Coffin',
    price: '520',
    image: '/images/products/coffin13.png',
    description: 'Our Child’s Curved Buff Willow Coffin features tapered round ends, beautifully plaited edging and natural hand-woven willow handles. We make each Child’s coffins with sensitivity in mind, each one made in our workshops in Somerset using natural willow and using completely natural processes. Every wicker coffin is made with the same care and dedication that has driven our family business for over four generations.',
    brand: 'Jason Bourne',
    currentInventory: 10
  },
  {
    categories: ['cremation urns'],
    name: 'Willow Round',
    price: '65',
    image: '/images/products/cremation-urn1.png',
    description: 'Exclusive to Compare the Coffin. This cremation urn is beautifully made with natural BambooBamboo comes from a group of perennial evergreen plants in the grass family, and is the fastest growing plant in the world. Produced in a UK owned Fair Trade company in China. Made from 100% natural materials and 100% Bio-degradable. Includes natural cotton liner',
    brand: 'Jason Bourne',
    currentInventory: 10
  },
  {
    categories: ['cremation urns'],
    name: 'Square Pandanus',
    price: '65',
    image: '/images/products/cremation-urn2.png',
    description: 'Exclusive to Compare the Coffin. This cremation urn is beautifully made with natural Pandanus grassesPandanus or wild pineapple is an environmentally friendly alternative to seagrass, a plant which grows in the coastal waters of East Africa, Southeast Asia and the Caribbean. Pandanus, it grows rapidly on land even in adverse conditions. When woven it is almost indistinguishable from seagrass. Produced in a Fair Trade company in Bali, Indonesia. Made from 100% natural materials. Includes natural cotton liner',
    brand: 'Jason Bourne',
    currentInventory: 3
  },
  {
    categories: ['cremation urns'],
    name: 'Pandanus Round Upright',
    price: '65',
    image: '/images/products/cremation-urn3.png',
    description: 'Exclusive to Compare the Coffin. This cremation urn is beautifully made with natural BambooBamboo comes from a group of perennial evergreen plants in the grass family, and is the fastest growing plant in the world. Produced in a UK owned Fair Trade company in China. Made from 100% natural materials and 100% Bio-degradable. Includes natural cotton liner',
    brand: 'Jason Bourne',
    currentInventory: 1
  },
  {
    categories: ['cremation urns'],
    name: 'Traditional Octagonal',
    price: '65',
    image: '/images/products/cremation-urn4.png',
    description: 'Exclusive to compare the coffin. These beautifully made traditional Cremation Urn, and Ash containers are available in any wood stain and or solid colour.All traditional Urns are available in the following Wood Stains: Dark Oak, Light Oak, Mahogony, Mid Oak, and Rose wood. Alternatively they can be offered in a solid colour: Linen White, Mid Blue, Pink, Deep Pink, Post Office Red, Summer Blue, Dark Blue,',
    brand: 'Jason Bourne',
    currentInventory: 3
  },
  {
    categories: ['cremation urns'],
    name: 'Traditional – Dark Oak',
    price: '70',
    image: '/images/products/cremation-urn5.png',
    description: 'Exclusive to Compare the Coffin. This cremation urn is beautifully made with natural BambooBamboo comes from a group of perennial evergreen plants in the grass family, and is the fastest growing plant in the world. Produced in a UK owned Fair Trade company in China. Made from 100% natural materials and 100% Bio-degradable. Includes natural cotton liner',
    brand: 'Jason Bourne',
    currentInventory: 1
  },
  {
    categories: ['cremation urns'],
    name: 'Round Bamboo',
    price: '65',
    image: '/images/products/cremation-urn6.png',
    description: 'Exclusive to Compare the Coffin. This cremation urn is beautifully made with natural BambooBamboo comes from a group of perennial evergreen plants in the grass family, and is the fastest growing plant in the world. Produced in a UK owned Fair Trade company in China. Made from 100% natural materials and 100% Bio-degradable. Includes natural cotton liner',
    brand: 'Jason Bourne',
    currentInventory: 2
  },
  {
    categories: ['natural material coffin'],
    name: 'English Willow Coffin – Natural / Buff – Rounded',
    price: '750',
    image: '/images/products/coffin4.png',
    description: ' This English Wicker coffin is made from English Willow grown on the Somerset Levels.The willow is a deciduous tree found primarily on moist soil in cold and temperate regions . Almost all willows take root very readily from cuttings or where broken branches lie on the ground.Made by one of the UK’s oldest manufacturers of willow coffins using 100 % natural materials.Includes cotton liner, headrest and name plate.',
    brand: 'Jason Bourne',
    currentInventory: 8
  },
  {
    categories: ['natural material coffin'],
    name: 'Willow Rounded Coffin',
    price: '505',
    image: '/images/products/coffin5.png',
    description: 'You know your dad’s incredible vintage bomber jacket? The Nirvana dakota tan leather sofa is that jacket, but in couch form. With super-plush down-filled cushions, a corner-blocked wooden frame, and a leather patina that only gets better with age, the Nirvana will have you looking cool and feeling peaceful every time you take a seat. Looks pretty great with a sheepskin throw, if we may say so. With use, this leather will become softer and more wrinkled and the cushions will take on a lived-in look, like your favorite leather jacket.',
    brand: 'Jason Bourne',
    currentInventory: 10
  },
  {
    categories: ['natural material coffin', 'Wicker'],
    name: 'Shroud and Wicker stretcher',
    price: '475',
    image: '/images/products/shroud-willow-stretcher-1.png',
    description: 'This beautifully made Shroud and Willow stretcher is a real alternative to a natural material coffin The willow is a deciduous tree found primarily on moist soil in cold and temperate regions. Almost all willows take root very readily from cuttings or where broken branches lie on the ground. Made by a co-operative of cottage industries in Poland using 100% natural materials. Includes cotton liner, headrest and name plate.',
    brand: 'Jason Bourne',
    currentInventory: 10
  },
]

inventory.map(i => {
  i.id = uuid()
  return i
})

export default inventory