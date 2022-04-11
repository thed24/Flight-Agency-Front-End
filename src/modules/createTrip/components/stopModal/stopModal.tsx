import DateFnsUtils from "@date-io/date-fns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { Modal, TextField, Button } from "@mui/material";
import { SC } from "common/components";
import { DateRange, Place } from "common/types";
import { useState, useCallback, useEffect } from "react";
import * as SSC from "./stopModal.styles";

export interface Props {
  place: Place | null;
  value: DateRange;
  open: boolean;
  setOpen: (val: boolean) => void;
  setValue: (val: DateRange) => void;
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
  const [start, setStart] = useState(value.start);
  const [end, setEnd] = useState(value.end);

  const handleChangeStart = useCallback((event: string | null) => {
    setStart(event === null ? new Date() : new Date(event));
  }, []);

  const handleChangeEnd = useCallback((event: string | null) => {
    setEnd(event === null ? new Date() : new Date(event));
  }, []);

  useEffect(() => {
    setValue({ start, end });
  }, [start, end, setValue]);

  return (
    place && (
      <Modal open={open} onClose={setOpen}>
        <SSC.ModalContainer>
          <SC.Title> {place.name} </SC.Title>
          <SC.SubTitle> {place.vicinity} </SC.SubTitle>
          <SC.SubTitle> Rated {place.rating} / 5</SC.SubTitle>

          <SC.SubTitle> Select a Time </SC.SubTitle>

          <LocalizationProvider dateAdapter={DateFnsUtils}>
            <DateTimePicker
              label="Start Time"
              value={start}
              onChange={handleChangeStart}
              renderInput={(params) => <TextField {...params} />}
              minDate={new Date().toISOString()}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={DateFnsUtils}>
            <DateTimePicker
              label="Stop Time"
              value={end}
              onChange={handleChangeEnd}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <Button onClick={confirm}>Save Stop</Button>
          <Button onClick={cancel}>Cancel</Button>
        </SSC.ModalContainer>
      </Modal>
    )
  );
}
