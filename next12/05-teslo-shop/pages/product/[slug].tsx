// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// import { GetServerSideProps } from "next";

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
import { GetStaticProps, GetStaticPaths } from "next";

import { ProductSlideShow, SizeSelector } from "@/components/products";
import { ItemCounter } from "@/components/ui";
import { ICartProduct, IProduct, ISize } from "@/interfaces";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { FC, useContext, useState } from "react";
import { ShopLayout } from "../../components/layouts/ShopLayout";
import { initialData } from "../../database/seed-products";
import { dbProducts } from "@/database";
import { useRouter } from "next/router";
import { CartContext } from "@/context";

interface Props {
  product: IProduct;
  children: JSX.Element | JSX.Element[];
}

const product = initialData.products[0];

const ProductPage: FC<Props> = ({ product }) => {
  // ESTO NO se debe usar asi, no tendriamos el SEO optimizado, lo unico q veerian los bots de google
  // seria un h1 con loading...
  // const router = useRouter();
  // const { products: product, isLoading } = useProducts(
  //   `/product/${router.query.slug}`
  // );

  // if (isLoading) {
  //   return <h1>Cargando...</h1>;
  // }

  // if (!product) {
  //   return <h1>No existe</h1>;
  // }
  // ----------------------------------------------------------------
  const router = useRouter();
  const { addProductToCart } = useContext(CartContext);

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    images: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const onSelectedSize = (size: ISize) => {
    setTempCartProduct((currentProduct) => ({ ...currentProduct, size }));
  };

  const onAddProduct = () => {
    if (!tempCartProduct.size) return;

    addProductToCart(tempCartProduct);
    router.push("/cart");
  };

  const onUpdateQuantity = (newValue: number) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      quantity: newValue,
    }));
  };

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideShow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              {`$${product.price}`}
            </Typography>

            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Cantidad</Typography>
              <ItemCounter
                currentValue={tempCartProduct.quantity}
                updatedQuantity={onUpdateQuantity}
                maxValue={product.inStock > 10 ? 10 : product.inStock}
              />
              <SizeSelector
                selectedSize={tempCartProduct.size}
                sizes={product.sizes}
                onSelectedSize={onSelectedSize}
              />
            </Box>

            {product.inStock > 0 ? (
              <Button
                color="secondary"
                className="circular-btn"
                onClick={onAddProduct}
                disabled={!tempCartProduct.size}
              >
                {tempCartProduct.size
                  ? "Agregar al carrito"
                  : "Seleccione una Talla"}
              </Button>
            ) : (
              <Chip
                label="No hay disponibles"
                color="error"
                variant="outlined"
              />
            )}

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Descripción</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// ----------------------------------------------------------------
// Esta solucion se puede implementar pero NEXTJS te pide que hagas todo ESTATICO hasta donde se pueda
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { slug = "" } = params as { slug: string };
//   const product = await dbProducts.getProductBySlug(slug as string);

//   if (!product) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       product,
//     },
//   };
// };
// ----------------------------------------------------------------

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbProducts.getAllProductsSlugs();

  return {
    paths: productSlugs.map((obj) => ({ params: { slug: obj.slug } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: { destination: "/", permanent: false },
    };
  }

  return {
    props: { product },
    revalidate: 60 * 60 * 24, // every 24 hours
  };
};

export default ProductPage;
