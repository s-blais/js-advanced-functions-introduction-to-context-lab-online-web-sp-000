
function createEmployeeRecord (empInfoArray) {
  return Object.assign({}, {
    firstName: empInfoArray[0],
    familyName: empInfoArray[1],
    title: empInfoArray[2],
    payPerHour: empInfoArray[3],
    timeInEvents: [],
    timeOutEvents: []
  })
}
function createEmployeeRecords (empArrays) {
  return empArrays.map(empArray => Object.assign({}, createEmployeeRecord(empArray)))
};

function createTimeInEvent (empRec, dateStamp) {
  empRec['timeInEvents'].push(Object.assign({}, {
    type: 'TimeIn',
    hour: parseInt(dateStamp.split(' ')[1]),
    date: dateStamp.split(' ')[0]
  }));
  return empRec;
};

function createTimeOutEvent (empRec, dateStamp) {
  empRec['timeOutEvents'].push(Object.assign({}, {
    type: 'TimeOut',
    hour: parseInt(dateStamp.split(' ')[1]),
    date: dateStamp.split(' ')[0]
  }));
  return empRec;
};

function hoursWorkedOnDate (empRec, date) {
  const timeInByDate = empRec.timeInEvents.find(obj =>
    obj.date === date && obj.type === 'TimeIn').hour;
  const timeOutByDate = empRec.timeOutEvents.find(obj =>
    obj.date === date && obj.type === 'TimeOut').hour;
  return (timeOutByDate-timeInByDate)/100;
}

function wagesEarnedOnDate (empRec, date) {
  return hoursWorkedOnDate(empRec, date)*empRec.payPerHour
}

