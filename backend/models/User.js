import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    count: {
      type: Number,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    bankname: {
      type: String,
      required: true,
    },
    money: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    rate: {
      type: Number,
      default: 12.5,
    },
    pay: Number, // Ajout du champ pay
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  this.pay = parseFloat(this.money) * (1 + this.rate); // Calcul du pay
  next();
});

const usermodel = mongoose.model("user", userSchema);

export default usermodel;
