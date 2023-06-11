import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { GiHospitalCross } from "react-icons/gi";

import AddHealthcare from "../forms/AddHealthcare";

function HospitalRegister() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>
        <GiHospitalCross /> <Box ml={2}>Add Hospital</Box>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(10px)" bg="transparent" />
        <ModalContent>
          <ModalHeader>Add Health Care Center</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <AddHealthcare onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default HospitalRegister;
