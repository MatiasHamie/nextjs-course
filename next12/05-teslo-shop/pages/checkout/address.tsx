import { ShopLayout } from "@/components/layouts";
import { CartContext } from "@/context";
import { countries } from "@/utils";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// import { GetServerSideProps } from "next";

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
};

const getAddressFromCookies = (): FormData => {
  return {
    firstName: Cookies.get("firstName") || "",
    lastName: Cookies.get("lastName") || "",
    address: Cookies.get("address") || "",
    address2: Cookies.get("address2") || "",
    zip: Cookies.get("zip") || "",
    city: Cookies.get("city") || "",
    country: Cookies.get("country") || "",
    phone: Cookies.get("phone") || "",
  };
};

const AddressPage = () => {
  const { updateAddress } = useContext(CartContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      address2: "",
      zip: "",
      city: "",
      country: countries[0].code,
      phone: "",
    },
  });

  useEffect(() => {
    reset(getAddressFromCookies());
  }, []);

  const onSubmitAddress = (data: FormData) => {
    updateAddress(data);
    router.push("/checkout/summary");
  };

  return (
    <ShopLayout
      title="Dirección"
      pageDescription="Confirmar dirección del destino"
    >
      <form onSubmit={handleSubmit(onSubmitAddress)} noValidate>
        <Typography variant="h1" component="h1">
          Direccion
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("firstName", {
                required: "Este campo es requerido",
              })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              label="Nombre"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("lastName", {
                required: "Este campo es requerido",
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              label="Apellido"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("address", {
                required: "Este campo es requerido",
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
              label="Direccion"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("address2")}
              error={!!errors.address2}
              helperText={errors.address2?.message}
              label="Direccion 2 (opcional)"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("zip", {
                required: "Este campo es requerido",
              })}
              error={!!errors.zip}
              helperText={errors.zip?.message}
              label="Código Postal"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("city", {
                required: "Este campo es requerido",
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
              label="Ciudad"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* <FormControl fullWidth> */}
            <TextField
              fullWidth
              variant="filled"
              label="País"
              value={Cookies.get("country" || countries[0].code)}
              {...register("country", {
                required: "Este campo es requerido",
              })}
              helperText={errors.country?.message}
              error={!!errors.country}
            >
              {/* {countries.map((country) => (
                <MenuItem key={country.code} value={country.code}>
                  {country.name}
                </MenuItem>
              ))} */}
            </TextField>
            {/* </FormControl> */}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("phone", {
                required: "Este campo es requerido",
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              label="Teléfono"
              variant="filled"
              fullWidth
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
          <Button
            color="secondary"
            className="circular-btn"
            size="large"
            type="submit"
          >
            Revisar Pedido
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

// ----------------------------------------------------------------
// NO usar esto, se debe usar un middleware
// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const { token = "" } = req.cookies;
//   let isValidToken = false;

//   try {
//     await jwt.isValidToken(token);
//     isValidToken = true;
//   } catch (error) {
//     isValidToken = true;
//   }

//   if (!isValidToken) {
//     return {
//       redirect: {
//         destination: "/auth/login?p=/checkout/address",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };

export default AddressPage;
