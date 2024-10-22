import axios from "axios";

const validatePan = async (pan: string) => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  if (!panRegex.test(pan)) {
    throw {
      status: 400,
      message:
        "PAN must be a valid 10-character alphanumeric string (e.g., ABCDE1234F)",
      errorCode: "INVALID_PAN_FORMAT",
    };
  }
  try {
    const response = await axios.post(
      "https://mvp.verify24x7.in/verifyApi/api/validate-pan",
      { pan },
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    const errorMsg = error.response?.data || "PAN validaton failed";
    throw {
      status: 400,
      message: errorMsg.message || errorMsg,
      errorCode: "INVALID_PAN",
    };
  }
};

export default validatePan;
