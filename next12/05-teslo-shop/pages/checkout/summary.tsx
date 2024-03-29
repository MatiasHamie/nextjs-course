import { CartList, OrderSummary } from "@/components/cart";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { ShopLayout } from "../../components/layouts/ShopLayout";
import NextLink from "next/link";
import { useContext, useEffect } from "react";
import { CartContext } from "@/context";
import { countries } from "@/utils";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const SummaryPage = () => {
  const router = useRouter();
  const { shippingAddress, numberOfItems, createOrder } =
    useContext(CartContext);

  useEffect(() => {
    if (!Cookies.get("firstName")) {
      router.push("/checkout/address");
    }
  }, [router]);

  if (!shippingAddress) {
    return <></>;
  }

  const onCreateOrder = () => {
    createOrder();
  };

  const {
    firstName,
    lastName,
    city,
    address,
    address2 = "",
    zip,
    phone,
    country,
  } = shippingAddress;

  return (
    <ShopLayout
      title="Resumen de la orden"
      pageDescription="Resumen de la orden"
    >
      <Typography variant="h1" component="h1">
        Resumen de la orden
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Resumen ({numberOfItems}{" "}
                {numberOfItems! > 1 ? "productos" : "producto"})
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle1">
                  Dirección de entrega
                </Typography>
                <NextLink href="/checkout/address" legacyBehavior passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <Typography>
                {firstName} {lastName}
              </Typography>
              <Typography>
                {address}
                {address2 ? `, ${address2}` : ""}
              </Typography>
              <Typography>
                {city}, {zip}
              </Typography>
              {/* <Typography>
                {countries.find((c) => c.code === country)?.name}
              </Typography> */}
              <Typography>{country}</Typography>
              <Typography>{phone}</Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" legacyBehavior passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>
              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                <Button
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  onClick={onCreateOrder}
                >
                  Confirmar Orden
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
