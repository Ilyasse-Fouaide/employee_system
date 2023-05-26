const { Employee } = require("../Models/employee.model");
const { Fonction } = require("../Models/fonction.model");

exports.create = async (req, res) => {
  try {

    const { fonction } = req.body;

    if (!fonction) {
      return res.status(400).json({ error: "Enter Your required fields." });
    }

    const exists_fonction = await Fonction.findOne({ fonction });

    if (exists_fonction) {
      return res.status(400).json({ error: "Fonction Already Exists." });
    }

    const newfonction = await new Fonction({ fonction });

    newfonction.save().then(() => {
      return res.status(200).json({ message: "Fonction Added Successfuly." });
    });

  } catch (error) {
    res.status(500).json({ error: "Something went wrong!." });
  }
}

exports.findAll = async (req, res) => {
  try {

    const fonction = await Fonction.find({}, { "_id": 1, "fonction": 1 });

    if (fonction.length === 0) {
      return res.status(400).json({ error: "No Fonction Found." });
    }

    return res.status(200).json(fonction);

  } catch (error) {
    res.status(500).json({ error: "Something went wrong!." });
  }
}

exports.update = async (req, res) => {
  try {

    const { id } = req.params;
    const newFonction = req.body.fonction;

    if (!newFonction) {
      return res.status(400).json({ error: "Enter Your required fields." });
    }

    const fonction = await Fonction.findById(id);

    if (!fonction) {
      return res.status(400).json({ error: "No Fonction Found." });
    }

    const duplicate = await Fonction.findOne({ fonction: newFonction });

    if (duplicate) {
      return res.status(400).json({ error: "Service Already Exists." });
    }

    fonction.fonction = newFonction;

    fonction.save().then(() => {
      return res.status(200).json({ message: "Fonction Updated." });
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

    await Fonction.findByIdAndDelete(id);

    return res.status(200).json({ message: "Fonction Deleted." });

  } catch (error) {
    res.status(500).json({ error: "Something went wrong!." });
  }
}

exports.employeeFonction = async (req, res) => {
  try {

    const { fonction, employee } = req.query;

    const FindEmployee = await Employee.findById(employee).populate("fonction");
    const Findfonction = await Fonction.findById(fonction);

    if (!FindEmployee || !Findfonction) {
      return res.status(400).json({ error: "No Employee or fonction found." });
    }

    FindEmployee.fonction = fonction;

    FindEmployee.save().then(() => {
      return res.status(200).json({ message: "fonction added to Employee." })
    }).catch((error) => {
      return res.status(400).json({ error })
    })

  } catch (error) {
    res.status(500).json({ error: "Something went wrong!." });
  }
}

exports.employeeFonctionDelete = async (req, res) => {
  try {

    const { employee } = req.query;

    const FindEmployee = await Employee.findById(employee).populate("fonction");

    if (!FindEmployee) {
      return res.status(400).json({ error: "No Empoyee found." });
    }

    await Employee.updateMany(
      { _id: employee },
      { $unset: { "fonction": "" } }
    );

    return res.status(200).json({ message: "Fonction removed from Employee." });

  } catch (error) {
    res.status(500).json({ error: "Something went wrong!." });
  }
}

exports.getAllWithOutFonction = async (req, res) => {
  try {

    const employees = await Employee.find().populate("fonction");

    const employeeWithOutFonction = employees.filter((employee) => !employee.fonction)

    if (employeeWithOutFonction.length === 0) {
      return res.status(404).json({ error: "No Employees Found." })
    }

    return res.status(200).json(employeeWithOutFonction);

  } catch (error) {
    res.status(500).json({ error: "Something went wrong!." });
  }
}

exports.getAllWithFonction = async (req, res) => {
  try {
    const employeesWithFonction = await Employee.find({ fonction: { $ne: null } }).populate("fonction");

    if (employeesWithFonction.length === 0) {
      return res.status(404).json({ error: "No Employees Found." });
    }

    return res.status(200).json(employeesWithFonction);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};
