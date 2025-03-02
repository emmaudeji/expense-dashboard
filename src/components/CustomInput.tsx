
import { Eye, EyeOff, FilePenLine } from "lucide-react";
import React, { useState } from "react";
import { cn } from "../lib/utils";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  isTextArea?: boolean;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  icon,
  type = "text",
  className,
  required,
  isTextArea = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      {label && (
        <label htmlFor={props.name} className="flex items-center gap-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="flex items-center pl-2 gap-2 border border-gray-300 rounded-md w-full">
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        ) : 
        isTextArea ? null : (
          <span className="text-gray-500">
            {icon ? icon : <FilePenLine size={14} />}
          </span>
        )}

        {isTextArea ? (
          <textarea
            id={props.name}
            className={cn("p-2 border-none rounded h-16 focus-visible:ring-ring w-full", className)}
            required={required}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={props.name}
            type={isPassword && showPassword ? "text" : type}
            className="p-2 border-none rounded h-10 focus-visible:ring-ring w-full"
            required={required}
            {...props}
          />
        )}
      </div>
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
};
