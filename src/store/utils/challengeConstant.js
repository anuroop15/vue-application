export const ChallengeConstant = {
  challengeStage: {
    STAGE: "CHALLENGE",
    ERROR: "CHALLENGE_ERROR",
    FAIL: "CHALLENGE_FAIL",
    IN_PROCESS: "CHALLENGE_IN_PROCESS",
    RETRY: "CHALLENGE_RETRY",
    SELECT_METHOD: "CHALLENGE_SELECT_METHOD",
    SUCCESS: "CHALLENGE_SUCCESS",
    TIMEOUT: "CHALLENGE_TIMEOUT",
    TOO_MANY_ATTEMPTS: "CHALLENGE_TOO_MANY_ATTEMPTS",
    RSA_LOCKOUT: "CHALLENGE_STAGE_RSA_LOCKOUT"
  },

  authenticationMethod: {
    OOBPHONE: "OOBPHONE",
    OTPPHONE: "OTPPHONE",
    QUESTION: "QUESTION"
  },
  messages:{
    additionalAuthenticationRequired:"Additional authentication required",
    pleaseSelectAnAdditionalAuthenticationProcedure:"For your security it is necessary to authenticate your identity. Select the registered mobile phone in which you wish to receive your security code:</br>",
    youHaveReceivedMessage_OTPPHONE:"You have received a text message with the security code on your mobile phone ({0}) <br/>Please enter the code:</br>",
    youHaveNotReceivedMessage_OTPPHONE:"This code will be valid for the next three (3) minutes <br/><br/>Click \"new code\" to resend",
    pleaseAnswerAllFields:"Please complete all empty fields.",
    theAdditionalAuthenticationFailedPleaseTryAgain:"The additional authentication failed. Please try again",
    youHaveReachedTheMaximumNumberOfAttempts:"You have reached the maximum number of attempts",
    accept:"Accept",
    close:"Close",
    OTPPHONE_message_dontSeeMyPhone:"If your mobile phone is not listed, contact your banker to certify a new mobile phone in the bank's security procedure.",
    newChallengeMethod:"Alternate phone",
    newToken:"New code",
    code:"Code",
    CHALLENGE_METHOD_QUESTION:"Security questions",
    CHALLENGE_METHOD_OOBPHONE:"Phone call",
    CHALLENGE_METHOD_OTPPHONE:"One Time Password"
  }
};
