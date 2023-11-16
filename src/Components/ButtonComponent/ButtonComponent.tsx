import React from "react";
import Button from "@mui/material/Button";

type AllowedColors = "error" | "inherit" | "primary" | "secondary" | "success" | "info" | "warning";

interface ButtonComponentProps {
  onClick: () => void;
  variant?: "outlined" | "contained";
  className?: string;
  color?: AllowedColors;
  text: string;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  onClick,
  variant,
  className,
  color,
  text,
}) => {
  return (
    <div>
      <Button
        variant={variant}
        onClick={onClick}
        className={className}
        color={color}
      >
        {text}
      </Button>
    </div>
  );
};

export default ButtonComponent;
