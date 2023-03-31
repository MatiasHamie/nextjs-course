import { tesloApi } from "@/api";
import { AuthLayout } from "@/components/layouts";
import { AuthContext } from "@/context";
import { validations } from "@/utils";
import { ErrorOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const { loginUser } = useContext(AuthContext);

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);

    const isValidLogin = loginUser(email, password);

    if (!isValidLogin) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    // esto es porque uso query params cuando me tengo q loguear y estaba en una pagina
    const destination = router.query.p?.toString() || "/";
    router.replace(destination);
  };

  return (
    <AuthLayout title="Ingresar">
      {/* el no validate es para q no te tire el error generico del navegador */}
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Iniciar Sesión
              </Typography>
              <Chip
                className="fadeIn"
                color="error"
                icon={<ErrorOutline />}
                label="No reconocemos ese usuario / contraseña"
                sx={{ display: showError ? "flex" : "none" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                <TextField
                  {...register("email", {
                    required: "Este campo es requerido",
                    validate: (val) => validations.isEmail(val),
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                  label="Correo"
                  type="email"
                  variant="filled"
                />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                <TextField
                  {...register("password", {
                    required: "Este campo es requerido",
                    minLength: { value: 6, message: "Minimo 6 caracteres" },
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  fullWidth
                  label="Contraseña"
                  type="password"
                  variant="filled"
                />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                className="circular-btn"
                color="secondary"
                size="large"
                fullWidth
              >
                Ingresar
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink
                href={
                  router.query.p
                    ? `/auth/register?p=${router.query.p}`
                    : "/auth/register"
                }
                passHref
                legacyBehavior
              >
                <Link underline="always">¿No tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
