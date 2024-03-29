import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { FC, useContext } from "react";
import NextLink from "next/link";
import { ItemCounter } from "../ui";
import { CartContext } from "@/context";
import { ICartProduct } from "@/interfaces";

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
  const { cart, updateCartQuantity, removeCartProduct } =
    useContext(CartContext);

  const onNewCartQuantityValue = (
    product: ICartProduct,
    newQuantityValue: number
  ) => {
    product.quantity = newQuantityValue;
    updateCartQuantity(product);
  };

  const onRemoveProductFromCart = (product: ICartProduct) => {
    removeCartProduct(product);
  };

  return (
    <>
      {cart!.map((product) => (
        <Grid
          container
          spacing={2}
          key={product.slug + product.size}
          sx={{ mb: 1 }}
        >
          <Grid item xs={3}>
            {/* llevar a la pagina del producto */}
            <NextLink href={`/product/${product.slug}`} legacyBehavior passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.images}`}
                    component="img"
                    sx={{ borderRadius: "5px" }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body1">
                Talle: <strong>{product.size}</strong>
              </Typography>

              {editable ? (
                <ItemCounter
                  currentValue={product.quantity}
                  maxValue={5}
                  updatedQuantity={(value) =>
                    onNewCartQuantityValue(product, value)
                  }
                />
              ) : (
                <Typography variant="h5">
                  {product.quantity} {product.quantity > 1 ? "items" : "item"}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">{`$${product.price}`}</Typography>
            {/* Editable */}
            {editable && (
              <Button
                variant="text"
                color="secondary"
                onClick={() => onRemoveProductFromCart(product)}
              >
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
