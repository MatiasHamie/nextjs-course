// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from "next";
import { ProductList } from "@/components/products/ProductList";
import { Box, Typography } from "@mui/material";
import { NextPage } from "next";
import { ShopLayout } from "@/components/layouts";
import { dbProducts } from "@/database";
import { IProduct } from "@/interfaces";

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
  return (
    <ShopLayout
      title="Teslo-Shop - SearchPage"
      pageDescription="Encuentra los mejores producto de Teslo aqui"
    >
      <Typography variant="h1" component="h1">
        Buscar Producto
      </Typography>
      {foundProducts ? (
        <Typography
          variant="h2"
          component="h2"
          sx={{ mb: 1 }}
          textTransform="capitalize"
        >
          {query}
        </Typography>
      ) : (
        <Box display="flex">
          <Typography variant="h2" component="h2" sx={{ mb: 1 }}>
            No encontramos ningun producto:
          </Typography>
          <Typography
            variant="h2"
            component="h2"
            sx={{ mb: 1, ml: 1 }}
            color="secondary"
            textTransform="capitalize"
          >
            {query}
          </Typography>
        </Box>
      )}
      <ProductList products={products} />
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string }; //query le puse yo a la page [query]

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  let products = await dbProducts.getProductsByTerm(query);
  const foundProducts = products.length > 0;

  if (!foundProducts) {
    products = await dbProducts.getAllProducts();
  }
  return {
    props: { products, foundProducts, query },
  };
};

export default SearchPage;
