import { Typography } from "@mui/material";
import { SC } from "common/components";
import { LoadingOverlay } from "common/components/loadingOverlay/loadingOverlay";
import { usePost } from "common/hooks";
import { Trip } from "common/types";
import { CreateTripEndpoint } from "common/utilities";
import Link from "next/link";
import { useEffect } from "react";

export interface Props {
  id: string;
  trip: Trip;
}

export const SubmittedStep = ({ id, trip }: Props) => {
  const { loading: createTripLoading, request: createTripRequest } = usePost<
    Trip,
    void
  >(CreateTripEndpoint(id));

  useEffect(() => {
    if (id) createTripRequest(trip);
  }, [id]);

  if (createTripLoading) {
    return <LoadingOverlay loading={true} />;
  }

  return (
    <SC.Container>
      <Typography variant="h5">
        Your trip has been submitted successfully
      </Typography>
      <Typography variant="subtitle1">
        <Link href={"/"} passHref>
          Head home
        </Link>
      </Typography>
    </SC.Container>
  );
};
