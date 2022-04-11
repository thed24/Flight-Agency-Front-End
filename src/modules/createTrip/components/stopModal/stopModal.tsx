import DateFnsUtils from "@date-io/date-fns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { Modal, TextField, Button } from "@mui/material";
import { SC } from "common/components";
import { DateRange, Place } from "common/types";
import { useState, useCallback, useEffect } from "react";
import * as SSC from "./stopModal.styles";
import { start } from "repl";

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
  const handleChangeStart = useCallback(
    (event: string | null) => {
      setValue({
        start: event === null ? new Date() : new Date(event),
        end: value.end,
      });
    },
    [setValue, value.end]
  );

  const handleChangeEnd = useCallback(
    (event: string | null) => {
      setValue({
        start: value.start,
        end: event === null ? new Date() : new Date(event),
      });
    },
    [setValue, value.start]
  );

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
              value={value.start}
              onChange={handleChangeStart}
              renderInput={(params) => <TextField {...params} />}
              minDate={new Date().toISOString()}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={DateFnsUtils}>
            <DateTimePicker
              label="Stop Time"
              value={value.end}
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
