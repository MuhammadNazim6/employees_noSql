import mongoose from "mongoose";
const roleSchema = mongoose.Schema({
  role_name: {
    type: String,
    required: true,
  },
});

const roleModel = mongoose.model("role", roleSchema);

export default roleModel;
