export const isString = (val: string) => {
  if (val.includes('.') && val.length > 1 && val[val.length - 1] !== ' ') {
    return true;
  }
  if (val.length === 1 && val === ' ') {
    return false;
  }
  if (
    val[val.length - 1] === ' ' &&
    val[val.length - 1] !== val[val.length - 2] &&
    val[val.length - 2] !== ' '
  ) {
    return true;
  }
  if (
    val[val.length - 1]?.trim()?.toLowerCase() !==
      val[val.length - 1]?.trim()?.toUpperCase() ||
    val === ''
  ) {
    return true;
  }
  return false;
};

export const isFloat = (val: any) => {

  if (val?.includes('-') || val?.includes('+')) {
    return false;
  }
  if (val[val.length - 1] === ' ' || val === '.' || val === '0') {
    return false;
  }
  if (val.includes('.')) {
    val = val.replace('.', '');
    if ((!val.includes('.') && !isNaN(val?.trim())) || val === '') {
      return true;
    }
    return false;
  }
  if (!isNaN(val?.trim()) || val === '') {
    return true;
  }

  return false;
};

export const isNumber = (val: any) => {
  if (val[val.length - 1] === ' ' || val === '0') {
    return false;
  }
  if (val.includes('.')) {
    return false;
  }
  if (!isNaN(val?.trim()) || val === '') {
    return true;
  }
  return false;
};

export const isAlphanumeric = (val: any) => {
  if (val === '') {
    return true;
  }
  if (val.trim() === '' || /[^a-zA-Z0-9.\s]/.test(val)) {
    return false; // Reject if the value is empty, contains special characters, or only consists of whitespace
  }

  if (val.includes('  ') || val.includes('..')) {
    return false; // Reject if there are consecutive spaces or decimals
  }

  if (val?.includes('-') || val?.includes('+')) {
    return false;
  }
  if (
    val[val.length - 1] === ' ' &&
    val[val.length - 1] !== val[val.length - 2] &&
    val[val.length - 2] !== ' '
  ) {
    return true;
  }
  if (val.includes('.')) {
    val = val.replace('.', '');
    if (!val.includes('.') || val === '') {
      return true;
    }
    return false;
  }
  if (!isNaN(val?.trim()) || val === '') {
    return true;
  }
  if (val[val.length - 1] === ' ' || val === '0') {
    return false;
  }
  return true;
};

export const isValidInput = (value: string) => {
  if (value === '') {
    return true;
  }
  if (value.trim() === '') {
    return false; // Reject if the value is empty or only consists of whitespace
  }

  if (value.includes('  ') || value.includes('..')) {
    return false; // Reject if there are consecutive spaces or decimals
  }

  return true; // Accept the input if it meets all the conditions
};

export const IsValidEmail = (email: string) => {
  // if (!email.length) {
  // 	return true;
  // }
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidPassword = (password: string) => {
  if (!password.length) {
    return true;
  }
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(
    password,
  );
};

export const isValidComparedPassword = (
  newPassword: string,
  reEnterPassword: string,
) => {
  if (reEnterPassword.length) {
    if (newPassword != reEnterPassword) {
      return true;
    }
    return false;
  }
  return false;
};

export const isValidname = (text: string) => {
  if (text.length <= 2) {
    return true;
  }
  return false;
};

export const isFieldEmpty = (text: string) => {
  if (text == '') {
    return true;
  }
  return false;
};

export const isValidAlphaNumeric = (text: any) => {
  const reg = /[^A-Za-z0-9]/g;
  if (reg.test(text) != true) {
    return true;
  }
  return false;
};
