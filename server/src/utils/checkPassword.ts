import bcrypt from 'bcryptjs';

const checkPassword = async (
  password: string,
  password_hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, password_hash);
};
export default checkPassword;
