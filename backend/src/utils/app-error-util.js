class AppError extends Error {
  //! this is a special function which runs every time a object is created (new)
  constructor(message, statusCode) {
    super(); /// first statement should be super() statement this is calling the constructor function of parent class
    console.log("called");
    //? this will assign all the variables (message and statuscode with respective values)
    this.message = message;
    this.statusCode = statusCode;
  }
}

// let e1 = new AppError("Invalid Credentials", 404);
// let e2 = new AppError("Internal Server Error", 500);

// console.log(e1);
// console.log("==================");
// console.log(e2);

//! Error is my parent class or super class
//! AppError is my derived class or child class

export default AppError;
