"use client";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

export default function ControlledTextField<T extends FieldValues>({
  name, control, ...props
}: TextFieldProps & { name: Path<T>; control: Control<T> }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField {...field} {...props} error={!!error} helperText={error?.message || props.helperText} fullWidth />
      )}
    />
  );
}
