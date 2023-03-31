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
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);
  const { registerUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  const onRegisterUser = async ({ name, email, password }: FormData) => {
    setShowError(false);
    const { hasError, message } = await registerUser(name, email, password);

    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    // esto es porque uso query params cuando me tengo q loguear y estaba en una pagina
    const destination = router.query.p?.toString() || "/";

    router.replace("/");
  };
  return (
    <AuthLayout title="Ingresar">
      <form onSubmit={handleSubmit(onRegisterUser)}>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Crear cuenta
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
                  {...register("name", {
                    required: "Este campo es requerido",
                  })}
                  error={!!errors.name}
                  fullWidth
                  helperText={errors.name?.message}
                  label="Nombre Completo"
                  variant="filled"
                />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                <TextField
                  {...register("email", {
                    required: "Este campo es requerido",
                    validate: (val) => validations.isEmail(val),
                  })}
                  error={!!errors.email}
                  fullWidth
                  helperText={errors.email?.message}
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
                  })}
                  error={!!errors.password}
                  fullWidth
                  helperText={errors.password?.message}
                  label="Contraseña"
                  type="password"
                  variant="filled"
                />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                className="circular-btn"
                color="secondary"
                size="large"
                fullWidth
                type="submit"
              >
                Ingresar
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink
                href={
                  router.query.p
                    ? `/auth/login?p=${router.query.p}`
                    : "/auth/login"
                }
                passHref
                legacyBehavior
              >
                <Link underline="always">¿Ya tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
