import employeeModel from "../models/employeeModel.js";

const getAllEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    const employees = await employeeModel
      .find()
      // .populate("roleId")
      .skip(skip)
      .limit(limit);
    const totalEmployees = await employeeModel.countDocuments();

    if (employees.length > 0) {
      res.status(200).json({
        success: true,
        data: employees,
        pagination: {
          page: page,
          total: totalEmployees,
          limit,
          totalPages: Math.ceil(totalEmployees / limit),
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to fetch employees",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing the request",
    });
  }
};

const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await employeeModel.findById(id).populate("roleId");

    if (employee) {
      res.status(200).json({
        success: true,
        data: employee,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Employee with this id doest not exist",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing the request",
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    const { name, roleId, empcode, mail_id, phone_number } = req.body;
    const employWithSameMail = await employeeModel.findOne({ mail_id });
    if (employWithSameMail) {
      res.status(400).json({
        success: false,
        message: "Employ with same mail exists",
      });
      return;
    }
    const newEmployee = new employeeModel({
      name,
      roleId,
      empcode,
      mail_id,
      phone_number,
    });
    const saved = await newEmployee.save();
    if (saved) {
      res.status(200).json({
        success: true,
        message: "New employee has been added",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to add a new employee",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing the request",
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, roleId, empcode, mail_id, phone_number } = req.body;
    const employee = await employeeModel.findById(id);
    if (!employee) {
      res.status(400).json({
        success: false,
        message: "This employee do not exist",
      });
      return;
    }

    const updated = await employeeModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: name || employee.name,
          roleId: roleId || employee.roleId,
          empcode: empcode || employee.empcode,
          mail_id: mail_id || employee.mail_id,
          phone_number: phone_number || employee.phone_number,
        },
      },
      { new: true }
    );
    console.log("UPDATED:", updated);
    if (updated) {
      res.status(200).json({
        success: true,
        message: "The employee have been updated",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to update the employee data",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing the request",
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await employeeModel.deleteOne({ _id: id });
    if (deleted.deletedCount) {
      res.status(200).json({
        success: true,
        message: `Employee has been deleted`,
      });
    } else {
      res.status(400).json({
        success: false,
        message: `Unable to delete the employee`,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing the request",
    });
  }
};

export {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
