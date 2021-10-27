import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  const deummyProduct = [{
      id: "p1",
      price: 5,
      title: "book",
      description: "my first book"
    }, {
      id: "p2",
      price: 7,
      title: "car",
      description: "my first car"
    }, {
      id: "p3",
      price: 6,
      title: "cloth",
      description: "my first cloth"
    },  
  ];
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {
          deummyProduct.map(item => (
            <ProductItem
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
            />
          ))
        }
      </ul>
    </section>
  );
};

export default Products;
