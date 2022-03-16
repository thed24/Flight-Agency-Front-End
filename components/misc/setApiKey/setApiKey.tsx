import { Input, Button } from "@mui/material";
import { useState, useCallback } from "react";
import { getFromStorage, setInStorage } from "../../../utilities/storage";

export const SetApiKey = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const existingKey = getFromStorage<string>("apiKey");

  console.log(existingKey);

  const updateApiKey = useCallback((value: string) => {
    setApiKey(value);
  }, []);

  const saveApiKeyInStorage = useCallback(() => {
    if (apiKey) {
      setInStorage<string>("apiKey", apiKey);
    }
  }, [apiKey]);

  return existingKey ? null : (
    <>
      <Input value={apiKey} onChange={(e) => updateApiKey(e.target.value)} />
      <Button onClick={saveApiKeyInStorage}>Set API Key</Button>
    </>
  );
};
