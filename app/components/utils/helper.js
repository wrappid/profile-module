export function getAge(birthDate) {
  let dob = new Date(birthDate);
    
  //extract the year, month, and date from date input
  let dobYear = dob.getYear();
    
  let dobMonth = dob.getMonth();
    
  let dobDate = dob.getDate();

  //get the current date from the system
  let now = new Date();
    
  //extract the year, month, and date from current date
  let currentYear = now.getYear();
    
  let currentMonth = now.getMonth();
    
  let currentDate = now.getDate();

  //declare a variable to collect the age in year, month, and days
  let age = {};

  let dateAge = 0;
    
  let monthAge = 0;

  //get years
  let yearAge = currentYear - dobYear;

  //get months
  if (currentMonth >= dobMonth) {
    //get months when current month is greater
    monthAge = currentMonth - dobMonth;
  } else {
    yearAge--;
    monthAge = 12 + currentMonth - dobMonth;
  }

  //get days
  if (currentDate >= dobDate) {
    //get days when the current date is greater
    dateAge = currentDate - dobDate;
  } else {
    monthAge--;
    dateAge = 31 + currentDate - dobDate;

    if (monthAge < 0) {
      monthAge = 11;
      yearAge--;
    }
  }
  //group the age in a single variable
  age = {
    days  : dateAge,
    months: monthAge,
    years : yearAge,
  };

  let ageString = "";

  if (age.years > 0) {
    ageString = age.years + " year";
    if (age.years > 0) {
      ageString += "s";
    }
  }
  if (age.months > 0) {
    if (ageString) ageString += ", ";
    ageString += age.months + " month";
    if (age.months > 1) {
      ageString += "s";
    }
  }

  //show days only if year is 0 (zero)
  if (age.years > 0 === false) {
    if (age.days > 0) {
      if (ageString) ageString += ", ";
      ageString += age.days + " day";
      if (age.days > 1) {
        ageString += "s";
      }
    }
  }
  //return the calculated age
  return ageString && ageString.length > 0 ? ageString : "N/A";
}