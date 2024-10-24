const bcrypt = require("bcryptjs");

async function checkPassword() {
  const password = "Admin@123";
  const hashedPassword =
    "$2a$12$BHTQUpNEuRsVpeosxdvKfOaGCQ4LzLwmciSFlCNeXHMRBJZwE3Awa";

  const isMatch = await bcrypt.compare(password, hashedPassword);
  console.log("Does the password match?:", isMatch);
}

checkPassword();
