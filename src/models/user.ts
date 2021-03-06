import mongoose, { Document, Model } from 'mongoose';
// import AuthService from '@src/services/auth';
// import logger from '@src/logger';
import bcrypt from 'bcrypt';

export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
}

export enum CUSTOM_VALIDATION {
  DUPLICATED = 'DUPLICATED'
}

interface UserModel extends Omit<User, '_id'>, Document {}

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: [true, 'Email must be unique'],
    },
    password: { type: String, required: true },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

schema.path('email').validate(async (email: string) => {
  const emailCount = await mongoose.models.User.countDocuments({ email });
  return !emailCount;
}, 'already exists in the database.', CUSTOM_VALIDATION.DUPLICATED)

export async function hashPassword(password: string, salt = 10):Promise<string>{
  return await bcrypt.hash(password, salt);
}

export async function compairPasswords(hashedPassword: string, password: string): Promise<boolean>{
  return await bcrypt.compare(password, hashedPassword);
}

export const User: Model<UserModel> = mongoose.model('User', schema)