import React from "react";

interface InputErrorMsgProps {}

export const InputErrorMsg: React.FC<InputErrorMsgProps> = ({ children }) => {
  return (
    <div className={`flex text-secondary`} data-testid="input-error-msg">
      {children}
    </div>
  );
};
