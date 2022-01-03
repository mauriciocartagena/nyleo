import React from "react";

export const ButtonLink: React.FC<React.ComponentPropsWithoutRef<"button">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button className={`underline text-md ${className}`} {...props}>
      {children}
    </button>
  );
};
