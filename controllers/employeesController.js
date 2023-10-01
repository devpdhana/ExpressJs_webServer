data = {
employees : require('../model/data.json'),
setEmployees : function(data){this.employees=data}
}
const getAllemployees = (req,res)=>{
    res.json(data.employees)
}


const createNewemployee = (req,res)=>{
    const id = data.employees.length+1
    if (req.body.firstname && req.body.lastname){
      const firstName = req.body.firstname;
      const lastName = req.body.lastname;
      const newEmployee = {
        id,
        firstname: firstName,
        lastname: lastName,
      };
      const employees = [...data.employees, newEmployee];
      // data.employees.push(newEmployee) anotherway
      data.setEmployees(employees);
      res.json(data.employees);
    }else {
      res.json({"error message":"firstname and lastname are required"})
    }  
}

const updateEmployee = (req, res) => {
  if (!req.body.id){
    res.json({"error message":"id is required"})
  }else {
    const id = parseInt(req.body.id);
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const newEmployee = {
        id,firstname:firstName,lastname:lastName
    }
    // data.employees = data.employees.map((data) => {
    //   if (data.id === id) {
    //     return {id:id,
    //     firstname:firstName,
    //     lastname:lastName} 
    //   }else {return data}
    // });
    const employee = data.employees.find((data)=>
      data.id === id
    )
    if (!employee) {
      res.json({ "error message": "Employee not found" });
    } 
    if (firstName) employee.firstname = firstName
    if (lastName) employee.lastname = lastName
    const filterEmployee = data.employees.filter((employee)=>
      employee.id !== id
    )

    const employees = [...filterEmployee,employee]
    data.setEmployees(employees)
  res.json(data.employees);
}};


const deleteEmployee = (req, res) => {

  const employees = data.employees.filter((data)=>
    data.id !== req.body.id
  )
  data.setEmployees(employees)
  res.json(data.employees);
};


const getEmployee = (req, res) => {
  const id = parseInt(req.params.id)
  const employee = data.employees.find((employee) => employee.id === id);
  if (employee){
    res.json(employee);
  }else {
    res.json({"error message":"user not found"})
  }
};


module.exports = {
    getAllemployees,
    createNewemployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}