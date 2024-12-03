import { IProduct } from "./interfaces/products";

type RightPaneProps = {
  addedProducts: IProduct[];
};

const RightPane = ({ addedProducts }: RightPaneProps) => {
  return (
    <section>
      <h1>Added products</h1>
      <ul>
        {addedProducts.map((product) => (
          <li key={product.name}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RightPane;
