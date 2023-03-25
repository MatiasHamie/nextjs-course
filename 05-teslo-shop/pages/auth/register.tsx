import { AuthLayout } from "@/components/layouts";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import NextLink from "next/link";

const RegisterPage = () => {
  return (
    <AuthLayout title="Ingresar">
      <Box sx={{ width: 350, padding: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Crear cuenta
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              <TextField label="Nombre Completo" variant="filled" fullWidth />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              <TextField label="Correo" variant="filled" fullWidth />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              <TextField
                label="Contraseña"
                type="password"
                variant="filled"
                fullWidth
              />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              className="circular-btn"
              color="secondary"
              size="large"
              fullWidth
            >
              Ingresar
            </Button>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="end">
            <NextLink href="/auth/login" passHref legacyBehavior>
              <Link underline="always">¿Ya tienes cuenta?</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default RegisterPage;