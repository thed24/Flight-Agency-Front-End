import DateFnsUtils from "@date-io/date-fns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { Modal, TextField, Button } from "@mui/material";
import { Title, SubTitle } from "common/components";
import { DateRange, Place } from "common/types";
import { useState, useCallback, useEffect } from "react";
import * as SC from "./stopModal.styles";

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
        <SC.ModalContainer>
          <Title> {place.name} </Title>
          <SubTitle> {place.vicinity} </SubTitle>
          <SubTitle> Rated {place.rating} / 5</SubTitle>

          <SubTitle> Select a Time </SubTitle>

          <LocalizationProvider dateAdapter={DateFnsUtils}>
            <DateTimePicker
              label="Start Time"
              value={start}
              onChange={handleChangeStart}
              renderInput={(params) => <TextField {...params} />}
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
        </SC.ModalContainer>
      </Modal>
    )
  );
}
