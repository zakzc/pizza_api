import * as jwt from "jsonwebtoken"

export default function auth(req: any, res: any, next: any):object {
  const token:string = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided");
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_Key);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
}
