import jwt from "jsonwebtoken";

export const signToken = (_id: string, email: string) => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error("No hay semilla de JWT - Revisar variables de entorno");
  }

  return jwt.sign(
    // payload
    { _id, email },

    // seed
    process.env.JWT_SECRET_SEED,

    // Opciones
    { expiresIn: "30d" }
  );
};

export const isValidToken = (token: string): Promise<string> => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error("No hay semilla de JWT - Revisar variables de entorno");
  }

  if (token.length <= 10) {
    return Promise.reject("JWT no valido");
  }

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET_SEED || "", (error, payload) => {
        if (error) return reject("JWT no es válido");
        const { _id } = payload as { _id: string };
        resolve(_id);
      });
    } catch (error) {
      if (error) return reject("JWT no es válido");
    }
  });
};
