import * as bcrypt from "bcrypt"

export default async function hashFunc(dataToHash: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(dataToHash, salt);
  return hashed;
}
