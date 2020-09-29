const CATAGORY = {
    CLOTHS: 'CLOTHS',
    HARDWARE: 'HARDWARE'
  }
  
  module.exports = {
    CATAGORY: CATAGORY,
    products: [
      { id: 1, productName: 'T-shirt', CATAGORY: CATAGORY.CLOTHS },
      { id: 2, productName: 'RAM', CATAGORY: CATAGORY.HARDWARE },
      { id: 3, productName: 'HDD', CATAGORY: CATAGORY.HARDWARE },
      { id: 4, productName: 'jacket', CATAGORY: CATAGORY.CLOTHS },
      { id: 5, productName: 'shoes', CATAGORY: CATAGORY.CLOTHS }
    ],
    productDetails: [
      { id: 1, inStock: true,price:"$300", productID: 1 },
      { id: 2, inStock: true,price:"$500", productID: 2 },
      { id: 3, inStock: true,price:"$800", productID: 3 },
      { id: 4, inStock: false,price:"$100", productID: 4 },
      { id: 5, inStock: true,price:"$1000", productID: 5 }
    ]
  }

