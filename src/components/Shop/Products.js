import ProductItem from './ProductItem';
import classes from './Products.module.css';
const PRODUCTS = [
  {
      id: '1',
      title: 'Laptop',
      price: 1200,
      description: 'A high-performance laptop suitable for gaming and programming.'
  },
  {
      id: '2',
      title: 'Smartphone',
      price: 800,
      description: 'A sleek smartphone with the latest features and a stunning display.'
  },
  {
      id: '3',
      title: 'Headphones',
      price: 150,
      description: 'Noise-cancelling over-ear headphones with superior sound quality.'
  },
  {
      id: '4',
      title: 'Keyboard',
      price: 50,
      description: 'A mechanical keyboard with customizable RGB lighting.'
  },
  {
      id: '5',
      title: 'Monitor',
      price: 300,
      description: 'A 27-inch 4K UHD monitor with vibrant colors and sharp details.'
  },
  {
      id: '6',
      title: 'Mouse',
      price: 25,
      description: 'A lightweight and responsive gaming mouse with customizable buttons.'
  },
  {
      id: '7',
      title: 'Tablet',
      price: 600,
      description: 'A powerful tablet perfect for creative professionals and entertainment.'
  },
  {
      id: '8',
      title: 'Smartwatch',
      price: 250,
      description: 'A stylish smartwatch with health tracking and fitness features.'
  },
  {
      id: '9',
      title: 'Gaming Console',
      price: 500,
      description: 'A next-generation gaming console with ultra-fast loading and 4K gaming.'
  },
  {
      id: '10',
      title: 'Camera',
      price: 1000,
      description: 'A high-resolution DSLR camera for professional photography.'
  }
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {PRODUCTS.map(product => 
          <ProductItem
            key={product.id}
            title={product.title}
            price={product.price}
            id={product.id}
            description={product.description} >
          </ProductItem>)}
      </ul>
    </section>
  );
};

export default Products;

<ProductItem
          title='Test'
          price={6}
          description='This is a first product - amazing!'
        />