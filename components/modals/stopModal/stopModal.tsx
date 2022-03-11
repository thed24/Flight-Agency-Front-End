import * as React from "react";
import Box from "@mui/material/Box";
import { Modal, TextField, Typography, Button } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import { PlaceData } from "@googlemaps/google-maps-services-js";
import DateFnsUtils from "@date-io/date-fns";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 8,
  textAlign: "center",
};

export interface Props {
  place: PlaceData | null;
  value: Date;
  open: boolean;
  setOpen: (val: boolean) => void;
  setValue: (val: Date) => void;
  confirm: () => void;
  cancel: () => void;
}

export function StopModal({
  place,
  value,
  setValue,
  open,
  setOpen,
  confirm,
  cancel,
}: Props) {
  function handleChange(event: string | null) {
    setValue(event === null ? new Date() : new Date(event));
  }

  return (
    place && (
      <Modal open={open} onClose={setOpen}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            {place.name}
          </Typography>

          <Typography
            id="modal-modal-subtitle"
            variant="subtitle1"
            component="h2"
          >
            {place.vicinity}
          </Typography>

          <Typography
            id="modal-modal-subtitle"
            variant="subtitle1"
            component="h2"
          >
            Rated {place.rating} / 5
          </Typography>

          <Typography
            style={{ paddingTop: "50px", paddingBottom: "20px" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Select a Time
          </Typography>

          <LocalizationProvider dateAdapter={DateFnsUtils}>
            <DateTimePicker
              label="Stop Time"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <Button onClick={confirm} style={{ marginTop: "50px" }}>
            Save Stop
          </Button>
          <Button onClick={cancel} style={{ marginTop: "50px" }}>
            Cancel
          </Button>
        </Box>
      </Modal>
    )
  );
}
