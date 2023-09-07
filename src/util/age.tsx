export function calculateAge(birthdate:string) {
    // Parse the birthdate string
    const parts = birthdate.split(' ');
    const day = parseInt(parts[0], 10);
    const month = parts[1];
    const year = parseInt(parts[2], 10);
  
    // Define months in JavaScript's Date object
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    // Current date
    const currentDate = new Date();
  
    // Convert the month name to a numeric month (0-based)
    const birthMonth = months.indexOf(month);
  
    // Create a Date object for the birthdate
    const birthDate = new Date(year, birthMonth, day);
  
    // Calculate the difference in years
    let age = currentDate.getFullYear() - birthDate.getFullYear();
  
    // Check if the birthdate hasn't occurred this year yet
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      // Subtract 1 year from the calculated age
      age--;
    }
  
    return age;
  }
  
  // Example usage:
  const birthdate = "19 July 2001";
  const age = calculateAge(birthdate);
  console.log('Age:', age);
  