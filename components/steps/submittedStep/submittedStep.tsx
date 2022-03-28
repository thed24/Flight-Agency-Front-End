import { Typography } from "@mui/material";
import Link from "next/link";
import styles from "./submittedStep.module.css";

export const SubmittedStep = () => {
  return (
    <div className={styles.container}>
      <Typography variant="h5">
        Your trip has been submitted successfully
      </Typography>
      <Typography variant="subtitle1">
        <Link href={"/"} passHref>
          Head home
        </Link>
      </Typography>
    </div>
  );
};
