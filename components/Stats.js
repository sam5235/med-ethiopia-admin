import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { FaClipboard } from "react-icons/fa";
import { GiHospitalCross } from "react-icons/gi";
import { IoNewspaperOutline } from "react-icons/io5";
import { MdSick } from "react-icons/md";

import { getMeditopiaStats } from "../firebase/statsServices";

const Stats = () => {
  const [stat, setStat] = useState({});

  const fetchStats = async () => {
    const res = await getMeditopiaStats();
    setStat(res);
  };

  useEffect(() => {
    fetchStats();
  }, []);
  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={5} mb={5}>
      <GridItem colSpan={3}>
        <Card bgGradient="linear(to-b, brand.400, brand.300)" boxShadow="xl">
          <CardBody h={200}>
            <Flex justify="center" align="center" direction="column">
              <Flex
                justify="center"
                align="center"
                h={70}
                w={70}
                bg="whiteAlpha.300"
                borderRadius="50%"
                mb={2}
              >
                <GiHospitalCross color="white" fontSize={30} />
              </Flex>
              <Box h={25}>
                {stat.health_centers ? (
                  <Text fontSize="xl" color="white" fontWeight="semibold">
                    {stat.health_centers}
                  </Text>
                ) : (
                  <Spinner color="white" size="sm" />
                )}
              </Box>

              <Text fontSize="md" color="white">
                Healthcares
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem colSpan={3}>
        <Card bgGradient="linear(to-b, brand.400, brand.300)" boxShadow="xl">
          <CardBody h={200}>
            <Flex justify="center" align="center" direction="column">
              <Flex
                justify="center"
                align="center"
                h={70}
                w={70}
                bg="whiteAlpha.300"
                borderRadius="50%"
                mb={2}
              >
                <MdSick color="white" fontSize={30} />
              </Flex>
              <Box h={25}>
                {stat.patients ? (
                  <Text fontSize="xl" color="white" fontWeight="semibold">
                    {stat.patients}
                  </Text>
                ) : (
                  <Spinner color="white" size="sm" />
                )}
              </Box>
              <Text fontSize="md" color="white">
                Patients
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem colSpan={3}>
        <Card bgGradient="linear(to-b, brand.400, brand.300)" boxShadow="xl">
          <CardBody h={200}>
            <Flex justify="center" align="center" direction="column">
              <Flex
                justify="center"
                align="center"
                h={70}
                w={70}
                bg="whiteAlpha.300"
                borderRadius="50%"
                mb={2}
              >
                <FaClipboard color="white" fontSize={30} />
              </Flex>
              <Box h={25}>
                {stat.records ? (
                  <Text fontSize="xl" color="white" fontWeight="semibold">
                    {stat.records}
                  </Text>
                ) : (
                  <Spinner color="white" size="sm" />
                )}
              </Box>
              <Text fontSize="md" color="white">
                Medical Records
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </GridItem>

      <GridItem colSpan={3}>
        <Card bgGradient="linear(to-b, brand.400, brand.300)" boxShadow="xl">
          <CardBody h={200}>
            <Flex justify="center" align="center" direction="column">
              <Flex
                justify="center"
                align="center"
                h={70}
                w={70}
                bg="whiteAlpha.300"
                borderRadius="50%"
                mb={2}
              >
                <IoNewspaperOutline color="#fff" fontSize={30} />
              </Flex>
              <Box h={25}>
                {stat.blogs ? (
                  <Text fontSize="xl" color="white" fontWeight="semibold">
                    {stat.records}
                  </Text>
                ) : (
                  <Spinner color="white" size="sm" />
                )}
              </Box>
              <Text fontSize="md" color="white">
                Medical Blogs
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
};

export default Stats;
