import api from './api'

export const logClientSideInfo = (logs, isError) => {
  if (isError == undefined) isError = false;
  api({
    url: "/security/json/LogClientSideInformation",
    method: "post",
    data: { data: logs, error: isError }
  });
};
