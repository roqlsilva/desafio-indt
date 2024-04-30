import React from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Flex,
  Button,
} from '@chakra-ui/react'

export interface CustomConfirmDialogProps {
  title: string;
  message: string;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  onConfirm: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function CustomConfirmDialog({
                                      isOpen,
                                      onClose,
                                      title,
                                      message,
                                      confirmButtonLabel,
                                      cancelButtonLabel,
                                      onConfirm
                                    }: CustomConfirmDialogProps) {
  const cancelRef = React.useRef(null);

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>
              {message}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {cancelButtonLabel || "Não"}
              </Button>
              <Button colorScheme='red' onClick={() => {
                onConfirm();
                onClose()
              }} ml={3}>
                {confirmButtonLabel || "Sim"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
