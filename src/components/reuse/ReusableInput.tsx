"user client";
import { Input } from "@heroui/input";
import { useFormContext } from "react-hook-form";
import { IInput } from "@/src/types";
interface IProps extends IInput {}

const ReusableInput = ({
  variant = "bordered",
  size = "sm",
  radius="sm",
  required = false,
  type,
  label,
  name,
  placeholder,
  labelPlacement,
  endContent,
  defaultValue,
  className,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Input
        {...register(name)}
        endContent={endContent}
        errorMessage={
          errors[name]?.message ? (errors[name]?.message as string) : ""
        }
        isInvalid={!!errors[name]}
        label={label}
        labelPlacement={labelPlacement}
        placeholder={placeholder}
        required={required}
        size={size}
        type={type}
        variant={variant}
        radius={radius}
        defaultValue={defaultValue}
        className={className}
      />
    </>
  );
};

export default ReusableInput;
