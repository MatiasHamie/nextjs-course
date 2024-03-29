import { User } from "@/models";
import { db } from "./";
import bcrypt from "bcryptjs";

export const checkUserEmailPassword = async (
  email: string,
  password: string
) => {
  await db.connect();
  const user = await User.findOne({ email });
  await db.disconnect();

  if (!user) return null;

  if (!bcrypt.compareSync(password, user.password!)) {
    return null;
  }

  const { role, name, _id } = user;

  return {
    _id,
    email: email.toLowerCase(),
    role,
    name,
  };
};

// esta funcion crea o verifica el usuario de oAuth
// (o sea cuando se registran o loguean desde otra plataforma como gmail, google, blah)
export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
  await db.connect();
  console.log(oAuthEmail, oAuthName);
  console.log('oAuthToDbUser');
  const user = await User.findOne({ email: oAuthEmail });
  if (user) {
    await db.disconnect();
    const { _id, name, email, role } = user;
    return { _id, name, email, role };
  }

  const newUser = new User({
    email: oAuthEmail,
    name: oAuthName,
    password: "@", //no me importa el password de alguien oAuth, tmpoco lo voy a saber
    role: "client",
  });

  await newUser.save();
  await db.disconnect();
  const { _id, name, email, role } = newUser;
  return { _id, name, email, role };
};
