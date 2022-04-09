import { Modal, TextField, Button } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import DateFnsUtils from "@date-io/date-fns";
import { DateRange, Place } from "common/types";
import { Title } from "./title";
import { SubTitle } from "./subTitle";
import styled from "@emotion/styled";
import { useState, useCallback, useEffect } from "react";
import { Divider } from "./divider/divider";

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  background-color: white;
  border: 3px solid #5f5f5f;
  box-shadow: 24;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 25px;
`;

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
        <ModalContainer>
          <Title> {place.name} </Title>
          <SubTitle> {place.vicinity} </SubTitle>
          <SubTitle> Rated {place.rating} / 5</SubTitle>

          <Divider style={{ paddingTop: "20px" }} />

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

          <Divider />

          <Button onClick={confirm}>Save Stop</Button>
          <Button onClick={cancel}>Cancel</Button>
        </ModalContainer>
      </Modal>
    )
  );
}
