import React, {useState} from "react";
import {
  ButtonGroup,
  Card,
  CardBody,
  Flex, Heading,
  IconButton, useDisclosure
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import {useUrlData} from "../../../hooks/useUrlData";
import {FiEdit, FiInfo, FiPenTool, FiTrash} from "react-icons/fi";
import {CreateUrlModal} from "./CreateUrlModal";
import {IUrl} from "../../../@types";
import {CustomConfirmDialog} from "../../../components/Dialog";

interface ConfirmDialogProps {
  id: string;
  title: string;
  message: string;
}

export function UrlListPage() {

  const {isOpen, onOpen, onClose} = useDisclosure();
  const {urls, deleteUrl} = useUrlData();

  const [confirmDialogProps, setConfirmDialogProps] = useState<ConfirmDialogProps>();
  const [url, setUrl] = useState<IUrl>()

  function handleConfirmDelete(url: IUrl) {
    const dialogProps: ConfirmDialogProps = {
      id: url.id,
      title: "Deletar URL",
      message: `Você tem certeza que deseja deletar a URL ${url.path} ?`,
    };
    setConfirmDialogProps(dialogProps);
    onOpen()
  }

  return (
    <>
      <CustomConfirmDialog
        title={confirmDialogProps?.title || ""}
        message={confirmDialogProps?.message || ""}
        confirmButtonLabel="Deletar"
        cancelButtonLabel="Cancelar"
        onConfirm={() => deleteUrl(confirmDialogProps?.id || "")}
        isOpen={isOpen}
        onClose={onClose}
      />

      <Flex m={8} flex={1} flexDirection="column" alignItems="start" justifyContent="start">
        <Heading size='md'>URL's List</Heading>

        <Card flex={1} width="100%" mt={5} height="100%">
          <CardBody>

            <CreateUrlModal url={url} />

            <TableContainer mt={6}>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>#ID</Th>
                    <Th>Path</Th>
                    <Th>Accesses</Th>
                    <Th>Status Code</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {urls?.map(item => (
                    <Tr key={item.id}>
                      <Td>{item.id}</Td>
                      <Td>{item.path}</Td>
                      <Td>{item.accesses}</Td>
                      <Td>{item.statusCode || ""}</Td>
                      <Td>
                        <ButtonGroup variant='outline' spacing='6'>
                          <IconButton aria-label='View response body' icon={<FiEdit/>} onClick={() => setUrl(item)}/>
                          <IconButton aria-label='Delete Url' icon={<FiTrash/>} color='red' onClick={() => {
                            handleConfirmDelete(item);
                          }}/>
                        </ButtonGroup>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
}
