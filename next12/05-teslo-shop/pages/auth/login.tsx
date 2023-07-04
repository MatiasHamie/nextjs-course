import { tesloApi } from "@/api";
import { AuthLayout } from "@/components/layouts";
import { AuthContext } from "@/context";
import { validations } from "@/utils";
import { ErrorOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { getProviders, getSession, signIn } from "next-auth/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
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
  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);

  // const { loginUser } = useContext(AuthContext);

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);
    // credentials es el provider q configure en el [...nextauth]
    await signIn("credentials", { email, password });

    // const isValidLogin = loginUser(email, password);

    // if (!isValidLogin) {
    //   setShowError(true);
    //   setTimeout(() => setShowError(false), 3000);
    //   return;
    // }
    // // esto es porque uso query params cuando me tengo q loguear y estaba en una pagina
    // const destination = router.query.p?.toString() || "/";
    // router.replace(destination);
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

            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="end"
              flexDirection="column"
            >
              <Divider sx={{ width: "100%", mb: 2 }} />
              {Object.values(providers).map((p: any) => {
                if (p.id === "credentials")
                  return <div key="credentials"></div>;
                return (
                  <Button
                    key={p.id}
                    variant="outlined"
                    fullWidth
                    color="primary"
                    sx={{ mb: 2 }}
                    onClick={() => {
                      signIn(p.id);
                    }}
                  >
                    {p.name}
                  </Button>
                );
              })}
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });
  // esto es para que cuando se loguee ok redirecte a la pagina donde estaba previamente
  const { p = "/" } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
