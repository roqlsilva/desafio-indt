import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, useDisclosure, Button, Flex,
} from '@chakra-ui/react';

interface FormModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  buttonLabel: string;
  title: string;
  content: () => JSX.Element;
  onSubmit: () => void;
  onModalClose?: () => void;
  changeOperation?: () => void;
}

export function FormModal({
                            isOpen,
                            onOpen,
                            onClose,
                            buttonLabel,
                            title,
                            content,
                            onSubmit,
                            onModalClose,
                            changeOperation
                          }: FormModalProps) {
  return (
    <>
      <Flex justifyContent='end'>
        <Button onClick={() => {
          if (changeOperation) {
            changeOperation()
          }
          onOpen()
        }} colorScheme='teal' variant='outline'>{buttonLabel}</Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            {content()}
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={() => {
              if (onModalClose) {
                onModalClose();
              }
              onClose()
            }}>
              Cancelar
            </Button>
            <Button colorScheme='teal' onClick={() => {
              onSubmit();

              if (onModalClose) {
                onModalClose();
              }

              onClose();
            }}>Salvar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
