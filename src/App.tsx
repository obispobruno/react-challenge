import { useEffect, useState } from "react";
import { loadProducts } from "./services/products";
import { IProduct } from "./interfaces/products";

const App: React.FC = () => {
  const [originalProducts, setOriginalProducts] = useState<IProduct[]>([]);
  const [listedProducts, setProducts] = useState<IProduct[]>([]);
  const [addedProducts, setAddedProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    loadProducts().then((data: IProduct[]) => {
      setOriginalProducts(data);
      setProducts(data);
    });
  }, []);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;
    const product = listedProducts.find(
      (product: IProduct) => product.name === name,
    );

    if (!product) {
      return;
    }

    if (checked) {
      setAddedProducts([...addedProducts, product]);
    } else {
      setAddedProducts(
        addedProducts.filter(
          (addedProduct: IProduct) => addedProduct.name !== name,
        ),
      );
    }
  };

  const isProductAdded = (name: string): boolean => {
    return addedProducts.some((product) => product.name === name);
  };

  const filterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const filteredProducts = originalProducts.filter((product: IProduct) =>
      product.name.toLowerCase().includes(value.toLowerCase()),
    );
    setProducts(filteredProducts);
  };

  return (
    <main>
      <article>
        <nav>
          <div>
            <input type="text" onChange={filterByName} />
          </div>
          <ul>
            {listedProducts.map((product: IProduct) => (
              <li>
                <input
                  checked={isProductAdded(product.name)}
                  type="checkbox"
                  onChange={handleCheckboxChange}
                  name={product.name}
                />{" "}
                {product.name} - ${product.price}
              </li>
            ))}
          </ul>
        </nav>
        <section>
          <h1>Added products</h1>
          <ul>
            {addedProducts.map((product: IProduct) => (
              <li>
                {product.name} - ${product.price}
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
};

export default App;
