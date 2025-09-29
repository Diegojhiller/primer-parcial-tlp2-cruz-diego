import { model, Schema } from "mongoose";

// TODO: completar relacion embebida y configurar el virtuals para el populate inverso con assets

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["secretary", "administrator"],
      default: "secretary",
    },
    deletedAt: { 
      type: Date, 
      default: null 
    },
    profile:{
      employee_number:{
        type: String,
        unique: true,
        required: true
      },
      firts_name:{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
      },
      last_name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
      },
      phone: {
        type: String,
        required: false
      }
    },
    // ! FALTA COMPLETAR ACA
  },
  { timestamps: true }
);


UserSchema.pre(/^find/, function (next) {
  this.where({ deletedAt: null });
  next();
});

// ! FALTA COMPLETAR ACA

export const UserModel = model("User", UserSchema);

