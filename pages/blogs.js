import { useState } from "react";
import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";

import PostTable from "../components/PostTable";
import TinyEditor from "../components/TinyEditor";

const BlogsPage = () => {
  const [blog, setBlog] = useState({});
  const [metadata, setMetadata] = useState();

  return (
    <Grid
      templateColumns="repeat(12, 1fr)"
      height="calc(100vh - 100px)"
      p={5}
      gap={3}
    >
      <GridItem colSpan={12}>
        <PostTable setBlogToApprove={setBlog} setMetadata={setMetadata} />
      </GridItem>

      <Modal
        size={metadata ? "xl" : "6xl"}
        isOpen={blog.title !== undefined || metadata !== undefined}
        onClose={() => {
          setBlog({});
          setMetadata();
        }}
      >
        <ModalOverlay backdropFilter="blur(10px)" bg="transparent" />

        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {blog.title && (
              <Box h={750}>
                <TinyEditor blog={blog} setBlog={setBlog} />
              </Box>
            )}

            {metadata && (
              <Box>
                <Image
                  src={metadata.coverImage}
                  maxW={500}
                  mx="auto"
                  rounded="md"
                  width={"100%"}
                  height={300}
                />
                <Box mt={4} mb={4}>
                  <label>Title</label>
                  <Input disabled mt={2} value={metadata.title || ""} />
                  <Text mt={1} fontSize="xs" color="gray.400">
                    Title of the article
                  </Text>
                </Box>

                <Box mt={2} mb={4}>
                  <label>Description</label>
                  <Textarea
                    disabled
                    mt={2}
                    value={metadata.description || ""}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Text mt={1} fontSize="xs" color="gray.400">
                    A little about the blog for your readers
                  </Text>
                </Box>

                <Box mt={2} mb={4}>
                  <label>Catergory</label>
                  <Box mt={2}>
                    {metadata.categories.map((category, key) => (
                      <Badge key={key} colorScheme="blue" fontSize="0.7em">
                        {category.label}
                      </Badge>
                    ))}
                  </Box>
                  <Text mt={1} fontSize="xs" color="gray.400">
                    Category (up to 3) so readers know what is the article about
                  </Text>
                </Box>
              </Box>
            )}

            <Flex alignItems="end" mt={8} mb={4}>
              <Button
                onClick={() => {
                  if (metadata) {
                    setBlog(metadata);
                    setMetadata();
                  } else {
                    setMetadata(blog);
                    setBlog({});
                  }
                }}
                flex={1}
                fontSize={"sm"}
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
                {metadata ? "View Content" : "View Metadata"}
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Grid>
  );
};

export default BlogsPage;
