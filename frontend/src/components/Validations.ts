const validateCompanyName = (value: string) => {
  if (!value) {
    return "Company Name is required";
  } else if (value.length < 3) {
    return "Company Name must be at least 3 characters long";
  }
};

const validateCompanyUEN = (value: string) => {
  if (!value) {
    return "Company UEN is required";
  } else if (value.length !== 9 || !/^\d{8}[a-zA-Z]$/.test(value)) {
    return "Invalid Company UEN";
  }
};
const validateEmail = (email: string) => {
  if (!email) {
    return "Email address is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Invalid email address format";
  }
};
const validateName = (value: string) => {
  if (!value) {
    return "Full Name is required";
  } else if (value.length < 2) {
    return "Minimum 2 characters required";
  }
};
const validatePosition = (value: string) => {
  if (!value) {
    return "Position is required";
  } else if (value.length < 2) {
    return "Minimum 2 characters required";
  }
};
const validateMobile = (value: string) => {
  if (!value) {
    return "Mobile Number is required";
  } else if (value.length !== 8) {
    return "Enter a 8-digit Mobile Number";
  }
};
export {
  validateCompanyName,
  validateCompanyUEN,
  validateEmail,
  validateName,
  validatePosition,
  validateMobile,
};
