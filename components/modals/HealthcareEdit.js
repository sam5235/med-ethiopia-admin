import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";

import AddHealthcare from "../forms/AddHealthcare";

function HealthcareEdit({
  isOpen,
  onOpen,
  onClose,
  healthcare,
  onAdd,
  onEdit,
}) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(10px)" bg="transparent" />
        <ModalContent>
          <ModalHeader>Edit Healthcare Center</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <AddHealthcare
              onClose={onClose}
              healthcare={healthcare}
              onAdd={onAdd}
              onEdit={onEdit}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default HealthcareEdit;
