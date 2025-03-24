const Department = require("../schemas/departmentSchema");

exports.createDepartment = async (name, collegeId) => {
  return await Department.create({ name, college: collegeId });
};

exports.deleteDepartment = async (id) => {
  return await Department.findByIdAndDelete(id);
};

exports.findDepartmentById = async (id) => {
  return await Department.findById(id);
};
