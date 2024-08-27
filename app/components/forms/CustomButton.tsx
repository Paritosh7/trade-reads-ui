interface CustomButtonProps {
  label: string;
  className?: string;
  onClick: () => void;
}

import { Button } from "antd";
import React from "react";

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  className,
  onClick,
}) => (
  <Button
    size="large"
    onClick={onClick}
    type="primary"
    className={`${className}`}
  >
    {label}
  </Button>
);

export default CustomButton;
