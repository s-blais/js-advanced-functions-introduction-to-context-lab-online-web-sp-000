
function createEmployeeRecord (empInfoArray) {
  return {
    firstName: empInfoArray[0],
    familyName: empInfoArray[1],
    title: empInfoArray[2],
    payPerHour: empInfoArray[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords (empArrays) {
  return empArrays.map(empArray => createEmployeeRecord(empArray))
};

function createTimeInEvent (empRec, dateStamp) {
  empRec['timeInEvents'].push({
    type: 'TimeIn',
    hour: parseInt(dateStamp.split(' ')[1]),
    date: dateStamp.split(' ')[0]
  });
  return empRec;
};

function createTimeOutEvent (empRec, dateStamp) {
  empRec['timeOutEvents'].push({
    type: 'TimeOut',
    hour: parseInt(dateStamp.split(' ')[1]),
    date: dateStamp.split(' ')[0]
  });
  return empRec;
};

function hoursWorkedOnDate (empRec, date) {
  const timeInByDate = empRec.timeInEvents.find(event =>
    event.date === date).hour;
  const timeOutByDate = empRec.timeOutEvents.find(event =>
    event.date === date).hour;
  return (timeOutByDate-timeInByDate)/100;
}

function wagesEarnedOnDate (empRec, date) {
  return hoursWorkedOnDate(empRec, date)*empRec.payPerHour
}

function allWagesFor (empRec) {
  return empRec.timeInEvents.map(timeInEvent => timeInEvent.date)
  .reduce((allWages, day) => allWages + wagesEarnedOnDate(empRec, day), 0)
}

function findEmployeeByFirstName (srcArray, firstName) {
  return srcArray.find(emp => emp.firstName === firstName)
}

function calculatePayroll (empRecs) {
  return empRecs.reduce((total, emp) => total + allWagesFor(emp), 0)
}

// ---------

// REFACTOR: remove unnecessary Object.assign and instead create/return object literally
// function createEmployeeRecord (empInfoArray) {
  //   return Object.assign({}, {
    //     firstName: empInfoArray[0],
    //     familyName: empInfoArray[1],
    //     title: empInfoArray[2],
    //     payPerHour: empInfoArray[3],
    //     timeInEvents: [],
    //     timeOutEvents: []
    //   })
    // }
    
// REFACTOR: remove unnecessary Object.assign and instead create/return object literally
// function createEmployeeRecords (empArrays) {
  //   return empArrays.map(empArray => Object.assign({}, createEmployeeRecord(empArray)))
  // };
  
// REFACTOR: remove unnecessary Object.assign and instead create/return object literally. Same for createTimeOutEvent not shown here
// function createTimeInEvent (empRec, dateStamp) {
//   empRec['timeInEvents'].push(Object.assign({}, {
//     type: 'TimeIn',
//     hour: parseInt(dateStamp.split(' ')[1]),
//     date: dateStamp.split(' ')[0]
//   }));
//   return empRec;
// };

// REFACTOR: remove redundant "&& obj.type..." comparator
// function hoursWorkedOnDate (empRec, date) {
//   const timeInByDate = empRec.timeInEvents.find(obj =>
//     obj.date === date && obj.type === 'TimeIn').hour;
//   const timeOutByDate = empRec.timeOutEvents.find(obj =>
//     obj.date === date && obj.type === 'TimeOut').hour;
//   return (timeOutByDate-timeInByDate)/100;
// }

// REFACTOR: don't bother create const and instead dot-chain the expressions
// function allWagesFor (empRec) {
//   const allDatesWorked = empRec.timeInEvents.map(timeInEvent => timeInEvent.date)
//   return allDatesWorked.reduce((allWages, day) => allWages + wagesEarnedOnDate(empRec, day), 0)
// }