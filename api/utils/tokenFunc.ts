require("dotenv").config();
import jwt from "jsonwebtoken"


export default function token(payload: string): string {
  const token: any = jwt.sign(payload, process.env.JWT_Key)
  return token
}