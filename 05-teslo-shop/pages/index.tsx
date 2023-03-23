import { ProductList } from "@/components/products/ProductList";
import { initialData } from "@/database/products";
import { Typography } from "@mui/material";
import { NextPage } from "next";
import { ShopLayout } from "../components/layouts";

const Home: NextPage = () => {
  return (
    <ShopLayout
      title="Teslo-Shop - Home"
      pageDescription="Encuentra los mejores producto de Teslo aqui"
    >
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" component="h2" sx={{ mb: 1 }}>
        Todos los productos
      </Typography>

      {/* El "as any" es temporal hasta terminar el backend */}
      <ProductList products={initialData.products as any} />
    </ShopLayout>
  );
};
export default Home;
