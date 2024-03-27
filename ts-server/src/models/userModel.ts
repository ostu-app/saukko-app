import mongoose, { Schema, Document, Types } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from '../utils/config'

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  role: string;
  emailVerified: boolean;
  modified: number; // UNIX-timestamp in seconds
  isValidPassword: (password: string) => boolean;
  generateEmailVerificationToken: () => string;
  generateEmailVerificationLink: () => string;
  setPassword: (password: string) => void;
  generateResetPasswordToken: () => string;
  generateResetPasswordLink: () => string;
  generateJWT: () => string;
  addProperties: () => void;
}

export type User = (Document<unknown, {}, IUser & Document<any, any, any>> & IUser & Document<any, any, any> & {
  _id: Types.ObjectId;
});

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  modified: {
    type: Number,
    required: true,
    default: Math.floor(Date.now() / 1000),
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['customer', 'admin', 'teacher', 'supervisor'],
  },
  emailVerified: {
    type: Boolean,
    default: false,
  }
});

// method to check if password is correct
userSchema.methods.isValidPassword = function(password: string) {
  bcrypt.compareSync(password, this.passwordHash)
}

// method to generate email verification token
userSchema.methods.generateEmailVerificationToken = function() {
  return jwt.sign(
    { id: this._id, email: this.email },
    config.JWT_SECRET,
    { expiresIn: '1d' } 
  );
};

userSchema.methods.generateEmailVerificationLink = function() {
  return `${
    config.EMAIL_SERVICE_HOST
  }/verify-email/${this.generateEmailVerificationToken()}`
}

// method to set passwordHash
userSchema.methods.setPassword = function setPassword(password: string) {
  this.passwordHash = bcrypt.hashSync(password, 10);
};

// method to generate reset-password token
userSchema.methods.generateResetPasswordToken =
  function generateResetPasswordToken() {
    return jwt.sign(
      {
        id: this._id,
        allowPasswordReset: true,
      },
      config.JWT_SECRET,
      { expiresIn: '1h' }
    );
  };

// method to generate reset-password token and link
userSchema.methods.generateResetPasswordLink =
  function generateResetPasswordLink() {
    return `${
      config.EMAIL_SERVICE_HOST
    }/reset-password/${this.generateResetPasswordToken()}`;
  };

// method to generate JWT token for authentication
userSchema.methods.generateJWT = function generateJWT() {
  console.log("this", this)
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role,
      emailVerified: this.emailVerified,
    },
    config.JWT_SECRET,
    { expiresIn: '3d' }
  );
};

// Transform the returned object to remove the passwordHash and __v properties
userSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

// const User = mongoose.model('User', userSchema);
// User.addProperties = function addProperties(role) {
//   if (role === 'customer') {
//     userSchema.add({
//       // add here the properties for the customer if needed
//     });
//   } else if (role === 'teacher') {
//     userSchema.add({
//       // add here the properties for the teacher if needed
//     });
//   } else if (role === 'supervisor') {
//     userSchema.add({
//       // add here the properties for the supervisor if needed
//     });
//   } else if (role === 'admin') {
//     userSchema.add({
//       // add here the properties for the admin if needed
//     });
//   }
// };


export default mongoose.model<IUser & Document>("User", userSchema);
