const { Employee } = require("../Models/employee.model");
const { Service } = require("../Models/service.model");

exports.create = async (req, res) => {
  try {

    const { service } = req.body;

    if (!service) {
      return res.status(400).json({ error: "Enter Your required fields." });
    }

    const exists_service = await Service.findOne({ service });

    if (exists_service) {
      return res.status(400).json({ error: "Service Already Exists." });
    }

    const newService = await new Service({ service });

    newService.save().then(() => {
      return res.status(200).json({ message: "Service Added Successfuly." });
    });

  } catch (error) {
    res.status(500).json({ error: "Something went wrong!." });
  }
}

exports.findAll = async (req, res) => {
  try {

    const service = await Service.find({}, { "_id": 1, "service": 1 });

    if (service.length === 0) {
      return res.status(400).json({ error: "No Service Found." });
    }

    return res.status(200).json(service);

  } catch (error) {
    res.status(500).json({ error: "Something went wrong!." });
  }
}

exports.update = async (req, res) => {
  try {

    const { id } = req.params;
    const newService = req.body.service;

    if (!newService) {
      return res.status(400).json({ error: "Enter Your required fields." });
    }

    const service = await Service.findById(id);

    if (!service) {
      return res.status(400).json({ error: "No Service Found." });
    }

    const duplicate = await Service.findOne({ service: newService });

    if (duplicate) {
      return res.status(400).json({ error: "Service Already Exists." });
    }

    service.service = newService;

    service.save().then(() => {
      return res.status(200).json({ message: "Service Updated." });
    }).catch((error) => {
      return res.status(500).json({ error });
    });

  } catch (error) {
    res.status(500).json({ error: "Something went wrong!." });
  }
}

exports.delete = async (req, res) => {
  try {

    const { id } = req.params;

    await Service.findByIdAndDelete(id);

    return res.status(200).json({ message: "Service Deleted." });

  } catch (error) {
    res.status(500).json({ error: "Something went wrong!." });
  }
}

exports.employeeService = async (req, res) => {
  try {

    const { service, employee } = req.query;

    if (!service || !employee) {
      return res.status(400).json({ error: "You cannot Save an empty Data." });
    }

    const FindEmployee = await Employee.findById(employee).populate("service");
    const FindService = await Service.findById(service);

    if (!FindEmployee || !FindService) {
      return res.status(400).json({ error: "No Employee or Service found." });
    }

    FindEmployee.service = service;

    FindEmployee.save().then(() => {
      return res.status(200).json({ message: "Service added to Employee." })
    }).catch((error) => {
      return res.status(400).json({ error })
    })

  } catch (error) {
    res.status(500).json({ error: "Something went wrong!." });
  }
}

exports.employeeServiceDelete = async (req, res) => {
  try {

    const { employee } = req.query;

    const FindEmployee = await Employee.findById(employee).populate("service");

    if (!FindEmployee) {
      return res.status(400).json({ error: "No Empoyee found." });
    }

    await Employee.updateMany(
      { _id: employee },
      { $unset: { "service": "" } }
    );

    return res.status(200).json({ message: "Service removed from Employee." });

  } catch (error) {
    res.status(500).json({ error: "Something went wrong!." });
  }
}

exports.getAllWithOutService = async (req, res) => {
  try {

    const employees = await Employee.find().populate("service");

    const employeeWithOutService = employees.filter((employee) => !employee.service)

    if (employeeWithOutService.length === 0) {
      return res.status(404).json({ error: "No Employees Found." })
    }

    return res.status(200).json(employeeWithOutService);

  } catch (error) {
    res.status(500).json({ error: "Something went wrong!." });
  }
}

exports.getAllWithService = async (req, res) => {
  try {
    const employeesWithService = await Employee.find({ service: { $ne: null } }).populate("service");

    if (employeesWithService.length === 0) {
      return res.status(404).json({ error: "No Employees Found." });
    }

    return res.status(200).json(employeesWithService);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};
