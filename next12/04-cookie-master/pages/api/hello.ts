import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log(req.cookies);
  // esto es solo para ver como devolver cookies y blah
  res.status(200).json({ name: "Example", ...req.cookies });
}
