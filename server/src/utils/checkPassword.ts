import bcrypt from 'bcryptjs';

const checkPassword = async (
  password: string,
  password_hash: string
): Promise<boolean> => {
  console.log(password, password_hash);
  return bcrypt.compare(password, password_hash);
};
export default checkPassword;
