const { Employee } = require("../Models/employee.model");

exports.create = async (req, res) => {
  try {

    const { nom, prenom, dateN, dateEmbauche, salaire } = req.body;

    if (!nom || !prenom || !dateN || !dateEmbauche || !salaire) {
      return res.status(400).json({ error: "Enter Your required fields." });
    }

    const employee = await new Employee({
      nom, prenom, dateN, dateEmbauche, salaire
    });

    employee.save().then(() => {
      return res.status(200).json({ message: "Employee Added Successfuly." });
    })

  } catch (error) {
    res.status(500).json({ error: "Something went wrong!." });
  }
}

exports.getAll = async (req, res) => {
  try {

    const employees = await Employee.find().populate("service").populate("fonction");

    if (employees.length === 0) {
      return res.status(404).json({ error: "No Employees Found." })
    }

    return res.status(200).json(employees);

  } catch (error) {
    res.status(500).json({ error: "Something went wrong!." });
  }
}

exports.getByName = async (req, res) => {
  try {

    const { nom } = req.body;

    if (!nom) {
      return res.status(404).json({ error: "Enter Your Required Field." })
    }

    const employee = await Employee.findOne({ nom });

    if (!employee) {
      return res.status(404).json({ error: "No Employee Found." })
    }

    return res.status(200).json(employee);

  } catch (error) {
    res.status(500).json({ error: "Something went wrong!." });
  }
}

exports.edit = async (req, res) => {
  try {

    const { id } = req.params;

    if (!id || id === null) {
      return res.status(404).json({ error: "Id Must be provided." })
    }

    const employee = await Employee.findOne({ _id: id });

    if (!employee) {
      return res.status(404).json({ error: "No Employee Found." })
    }

    return res.status(200).json(employee);

  } catch (error) {
    res.status(500).json({ error: "Something went wrong!." + error });
  }
}

exports.update = async (req, res) => {
  try {

    const { id } = req.params;
    const { nom, prenom, dateN, dateEmbauche, salaire } = req.body;

    if (!nom || !prenom || !dateN || !dateEmbauche || !salaire) {
      return res.status(400).json({ error: "Enter Your required fields." });
    }

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ error: "No Employee Found." });
    }

    employee.nom = nom;
    employee.prenom = prenom;
    employee.dateN = dateN;
    employee.dateEmbauche = dateEmbauche;
    employee.salaire = salaire;

    employee.save().then(() => {
      return res.status(200).json({ message: "Employee Updated Successfully." });
    });

  } catch (error) {
    res.status(500).json({ error: "Something went wrong!." });
  }
}

exports.delete = async (req, res) => {
  try {

    const { id } = req.params;
    await Employee.findByIdAndDelete(id);

    return res.status(200).json({ message: "Employee Deleted Successfuly." });

  } catch (error) {
    res.status(500).json({ error: "Something went wrong!." });
  }
}
