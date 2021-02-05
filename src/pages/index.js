import { Box, Center, Flex, Image, Link } from "@chakra-ui/react";
import React, { Fragment } from "react";

export default function Home() {
  const myData = {
    name: "Aditya Raj Kumawat",
    profileImg:
      "https://i.ibb.co/T8zCFw1/Whats-App-Image-2021-01-18-at-4-19-26-PM-copy.jpg",
    location: "Jaipur, RJ",
  };
  return (
    <Fragment>
      <Box w="100%" h="100vh">
        <Center h="100%">
          <Flex direction="column" w="35%" h="100vh" pt="4">
            <Box w="100%" pt="4" pb="4" d="flex" alignItems="center">
              <Image
                boxSize="100px"
                src={myData.profileImg}
                objectFit="cover"
              />
              <Box p="2" d="flex" flexDirection="column">
                <Box fontWeight="700" fontSize="xl">
                  {myData.name}
                </Box>
                <Flex alignItems="center">
                  {/* <BiMap /> */}
                  <Box ml="1">{myData.location}</Box>
                </Flex>
              </Box>
            </Box>
            <Box w="100%" fontSize="xl">
              I'm a software engineer, currently working on{" "}
              <Link
                href="https://github.com/aadityarajkumawat/stithi"
                color="blue.500"
                target="_blank"
              >
                stithi
              </Link>
              . I love probability in particular and mathematics in general.
              Currently learning ChakraUI, my favourite technologies are: React,
              NodeJS, PostgreSQL, GraphQL, Typescript and MongoDB.
            </Box>
            {/* <Blogs />
            <Hire /> */}
          </Flex>
        </Center>
      </Box>
    </Fragment>
  );
}
