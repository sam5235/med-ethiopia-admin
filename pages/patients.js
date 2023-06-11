import { useEffect, useState } from "react";
import { listAllPatients } from "../firebase/patientServices";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FaRegHospital } from "react-icons/fa";
import { SearchIcon } from "@chakra-ui/icons";
import Pagination from "../components/pagination";

const PatientsPage = () => {
  const backColor = useColorModeValue("white", "gray.900");
  const badgeColor = useColorModeValue("gray.50", "gray.800");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [searchInput, setSearchInput] = useState("");
  const [selectedPatient, setSelectedPatient] = useState({});
  const [selectedSort, setSelectedSort] = useState("none");
  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchPaitents = async () => {
    const patients = await listAllPatients();
    setPatients(patients);
  };

  const sorrtedPatients = patients.slice().sort((a, b) => {
    if (!selectedSort || selectedSort === "none") {
      return 0;
    }
    return a[selectedSort].localeCompare(b[selectedSort]);
  });

  const lists =
    !selectedSort || selectedSort === "none" ? patients : sorrtedPatients;

  const filteredPatients = lists.filter(
    (h) =>
      h.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      h.phone.includes(searchInput)
  );

  const dataSize = filteredPatients.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPatients = filteredPatients.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    fetchPaitents();
  }, []);

  return (
    <Box>
      <Grid gap={4} templateColumns="repeat(12, 1fr)">
        <GridItem colSpan="12">
          <Box>
            <Flex mb={5} alignItems="center">
              <Box
                p="2"
                bg={useColorModeValue("white", "gray.900")}
                border="1px"
                mr="2"
                borderColor={useColorModeValue("gray.200", "gray.700")}
                borderRadius="lg"
                boxShadow="lg"
              >
                <FaRegHospital fontSize={30} />
              </Box>
              <Text fontSize="4xl">Patients</Text>
            </Flex>

            <Flex mb="5">
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Search"
                  bg="chakra-body-bg"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </InputGroup>
              <Select
                mx="2"
                maxW="200"
                bg="chakra-body-bg"
                placeholder="Sort By"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
              >
                <option value="none">None</option>
                <option value="name">Name</option>
                <option value="phone">Phone</option>
              </Select>
              <IconButton
                mx="2"
                colorScheme="brand"
                aria-label="Call Segun"
                icon={<SearchIcon />}
              />
            </Flex>
          </Box>
        </GridItem>

        {currentPatients.map((user, index) => (
          <GridItem key={index} colSpan="3">
            <Center pb={6}>
              <Box
                maxW={"320px"}
                w={"full"}
                bg={backColor}
                boxShadow={"2xl"}
                rounded={"lg"}
                p={6}
                textAlign={"center"}
              >
                <Avatar size={"xl"} src="" name={user.name} mb={4} />
                <Heading
                  fontSize={"2xl"}
                  fontFamily={"body"}
                  textTransform="capitalize"
                >
                  {user.name}
                </Heading>
                <Text fontWeight={600} color={"gray.500"} m2={4}>
                  {user.phone}
                </Text>
                <Text fontWeight={600} color={"gray.500"}>
                  {user.address}
                </Text>
                <Text fontWeight={400} color={"gray.600"}>
                  {user.createdAt.toDate().toDateString()}
                </Text>
                <Text fontWeight={400} color={"gray.400"} mb={2}>
                  {`${user.hospitals.length} Healthcare Involvement`}
                </Text>

                <Stack mt={4} direction={"row"} spacing={4}>
                  <Button
                    onClick={() => {
                      setSelectedPatient(user);
                      onOpen();
                    }}
                    flex={1}
                    fontSize={"sm"}
                    rounded={"full"}
                    bg={"blue.400"}
                    color={"white"}
                    boxShadow={
                      "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                    }
                    _hover={{
                      bg: "blue.500",
                    }}
                    _focus={{
                      bg: "blue.500",
                    }}
                  >
                    View Detail
                  </Button>
                </Stack>
              </Box>
            </Center>
          </GridItem>
        ))}

        <GridItem colSpan="12">
          <Pagination
            items={filteredPatients}
            dataSize={dataSize}
            indexOfLastItem={indexOfLastItem}
            indexOfFirstItem={indexOfFirstItem}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        </GridItem>
      </Grid>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setSelectedPatient({});
          onClose();
        }}
      >
        <ModalOverlay backdropFilter="blur(10px)" bg="transparent" />
        <ModalContent>
          <ModalHeader textTransform="capitalize">{`${selectedPatient.name}'s detail`}</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Box>
              {selectedPatient.name && (
                <Box w={"full"} p={6} textAlign={"center"}>
                  <Avatar
                    size={"xl"}
                    src=""
                    name={selectedPatient.name}
                    mb={4}
                  />
                  <Heading
                    fontSize={"2xl"}
                    fontFamily={"body"}
                    textTransform="capitalize"
                  >
                    {selectedPatient.name}
                  </Heading>
                  <Text fontWeight={600} color={"gray.500"} m2={4}>
                    {selectedPatient.phone}
                  </Text>
                  <Text fontWeight={600} color={"gray.500"}>
                    {selectedPatient.address}
                  </Text>
                  <Text fontWeight={400} color={"gray.600"}>
                    {selectedPatient.createdAt.toDate().toDateString()}
                  </Text>
                  <Text fontWeight={400} color={"gray.400"}>
                    {`${selectedPatient.hospitals.length} Healthcare Involvement`}
                  </Text>
                  <Text fontWeight={400} color={"gray.400"} mb={2}>
                    {selectedPatient.email}
                  </Text>
                </Box>
              )}
              <Box>
                <Flex justify="space-around">
                  <Box textAlign="center" w="150">
                    <Image mx="auto" w={50} src="/weight.png" />
                    <Text fontWeight={600} color={"gray.500"}>
                      Weight
                    </Text>
                    <Text fontWeight={400} color={"gray.700"}>
                      {selectedPatient.weight} Kg
                    </Text>
                  </Box>
                  <Box textAlign="center" w="150">
                    <Image mx="auto" w={50} src="/age.png" />
                    <Text fontWeight={600} color={"gray.500"}>
                      Age
                    </Text>
                    <Text fontWeight={400} color={"gray.700"}>
                      {selectedPatient.age} Years
                    </Text>
                  </Box>
                  <Box textAlign="center" w="150">
                    <Image mx="auto" w={50} src="/gender.png" />
                    <Text fontWeight={600} color={"gray.500"}>
                      Sex
                    </Text>
                    <Text fontWeight={400} color={"gray.700"}>
                      {selectedPatient.sex}
                    </Text>
                  </Box>
                  <Box textAlign="center" w="150">
                    <Image mx="auto" w={50} src="/height.png" />
                    <Text fontWeight={600} color={"gray.500"}>
                      Height
                    </Text>
                    <Text fontWeight={400} color={"gray.700"}>
                      {selectedPatient.height}
                    </Text>
                  </Box>
                </Flex>
              </Box>

              <Flex>
                <Button
                  flex={1}
                  mt={6}
                  fontSize={"sm"}
                  rounded={"full"}
                  onClick={() => {
                    setSelectedPatient({});
                    onClose();
                  }}
                  _focus={{
                    bg: "gray.200",
                  }}
                >
                  Close
                </Button>
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PatientsPage;
