import mongoose from "mongoose";
const employeeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "role",
    required: true,
  },
  empcode: {
    type: String,
    required: true,
  },
  mail_id: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
});

const employeeModel = mongoose.model("employee", employeeSchema);

export default employeeModel;
