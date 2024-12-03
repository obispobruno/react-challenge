import { useEffect, useState } from "react";
import { loadProducts } from "./services/products";
import { IProduct } from "./interfaces/products";
import LeftPane from "./LeftPane";
import RightPane from "./RightPane";

const App = () => {
  const [originalProducts, setOriginalProducts] = useState<IProduct[]>();
  const [addedProducts, setAddedProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    loadProducts().then((data) => {
      setOriginalProducts(data);
    });
  }, []);

  const onProductSelected = (product: IProduct, checked: boolean) => {
    if (checked) {
      setAddedProducts([...addedProducts, product]);
    } else {
      setAddedProducts(
        addedProducts.filter(
          (addedProduct) => addedProduct.name !== product.name,
        ),
      );
    }
  };

  return (
    <main>
      <article>
        <LeftPane products={originalProducts} addedProducts={addedProducts} onProductSelected={onProductSelected} />
        <RightPane addedProducts={addedProducts} />
      </article>
    </main>
  );
};

export default App;
