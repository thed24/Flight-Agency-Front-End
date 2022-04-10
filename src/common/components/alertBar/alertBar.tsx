import { Alert, Button } from "@mui/material";

export interface AlertDetails {
  message: string;
  type: "success" | "error";
}

export interface AlertBarProps {
  details: AlertDetails;
  callback: () => void;
}

export function AlertBar({ details, callback }: AlertBarProps) {
  const { message, type } = details;

  return (
    <Alert
      style={{ marginTop: "20px" }}
      severity={type}
      action={
        <Button onClick={callback} color="inherit" size="small">
          X
        </Button>
      }
    >
      {message}
    </Alert>
  );
}
