import { useState } from "react";
import { IProduct } from "./interfaces/products";

type LeftPaneProps = {
  onProductSelected: (product: IProduct, checked: boolean) => void;
  products: IProduct[] | undefined;
  addedProducts: IProduct[];
};

const LeftPane = ({ onProductSelected, products, addedProducts }: LeftPaneProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const listedProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const isProductAdded = (name: string) => {
    return addedProducts.some((product) => product.name === name);
  }

  return (
    <nav>
      <div>
        <input type="text" onChange={(e) => setSearchQuery(e.currentTarget.value)} value={searchQuery} />
      </div>
      <ul>
        {listedProducts?.map((product) => (
          <li key={product.name}>
            <input
              checked={isProductAdded(product.name)}
              type="checkbox"
              onChange={(e) => onProductSelected(product, e.currentTarget.checked)}
              name={product.name}
            />{" "}
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default LeftPane;
