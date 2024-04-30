import {FormControl, FormLabel, Input, useDisclosure} from "@chakra-ui/react";
import {FormModal} from "../../../components/Modal/FormModal";
import React, {useEffect, useState} from "react";
import {useUrlData} from "../../../hooks/useUrlData";
import {IUrl} from "../../../@types";

export interface CreateUrlModalProps {
  url?: IUrl,
  onCloseModal?: () => void;
}

export function CreateUrlModal({ onCloseModal, url }: CreateUrlModalProps) {

  const {isOpen, onOpen, onClose} = useDisclosure();
  const [path, setPath] = useState<string>("");
  const { createUrl, updateUrl } = useUrlData();
  const [operation, setOperation] = useState<"create" | "update">("create");

  function handleSubmit() {
    if (path) {
      if (operation === "create") {
        createUrl(path)
      } else {
        updateUrl(url?.id || "", path)
      }
    }
  }

  useEffect(() => {
    if (url) {
      setPath(url.path);
      setOperation("update");
      onOpen();
    }
  }, [url])

  return (
    <FormModal
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      buttonLabel='Nova URL'
      changeOperation={() => {
        setPath("");
        setOperation("create");
      }}
      title={operation === "create" ? "Nova URL" : "Atualizar URL"}
      onSubmit={handleSubmit}
      onModalClose={onCloseModal}
      content={() => (
        <FormControl>
          <FormLabel>URL Path</FormLabel>
          <Input
            value={path}
            type='url'
            maxLength={100}
            required={true}
            onChange={e => {
              setPath(e.target.value);
            }}
          />
        </FormControl>
      )}
    />
  );
}
