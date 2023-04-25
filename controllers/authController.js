const twilio = require("twilio");

// Replace these values with your Twilio account SID and auth token
const accountSid = "YOUR_ACCOUNT_SID";
const authToken = "YOUR_AUTH_TOKEN";
const client = twilio(accountSid, authToken);

// Generate a random 6-digit verification code
const generateCode = () => Math.floor(100000 + Math.random() * 900000);

// Send an SMS message with the verification code
const sendSMS = (phoneNumber, code) => {
  return client.messages.create({
    body: `Your verification code is: ${code}`,
    to: phoneNumber,
    from: "YOUR_TWILIO_PHONE_NUMBER",
  });
};

// Check if the verification code is valid
const verifyCode = async (phoneNumber, code, callback) => {
  try {
    const user = await User.findOne({ phoneNumber }).exec();

    if (!user) {
      callback(false); // User not found
      return;
    }

    if (user.verificationCode !== code) {
      callback(false); // Code is invalid, phone number is not verified
      return;
    }

    // Code is valid, update the user's `isPhoneVerified` field to true
    user.isPhoneVerified = true;
    await user.save();

    callback(true); // Phone number is verified
  } catch (err) {
    console.error(err);
    callback(false); // Error occurred while verifying phone number
  }
};

// Send a verification code to the user's phone number
exports.sendVerificationCode = (req, res, next) => {
  const { phoneNumber } = req.body;
  const code = generateCode();
  sendSMS(phoneNumber, code)
    .then(() => {
      // TODO: store the code in the database or cache
      res.status(200).json({ message: "Verification code sent successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// Verify the user's phone number with the verification code
exports.verifyPhoneNumber = (req, res, next) => {
  const { phoneNumber, code } = req.body;
  verifyCode(phoneNumber, code, (isValid) => {
    if (isValid) {
      // TODO: create or update the user in the database
      res.status(200).json({ message: "Phone number verified successfully" });
    } else {
      res.status(400).json({ error: "Invalid verification code" });
    }
  });
};
