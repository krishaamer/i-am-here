import React from "react";
import {
  Card,
  Grid,
  GridItem,
  CardHeader,
  CardBody,
  Heading,
  Avatar,
  Wrap,
  WrapItem,
  Button,
} from "@chakra-ui/react";

// @ts-ignore: Unreachable code error
export default function Friends({ friends }) {

  return (
    <div>
      <div className="header grid h-64 place-items-center">
        <Button colorScheme="teal" variant="outline">
          Open Group Chat
        </Button>
      </div>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {friends?.data?.TokenBalances?.TokenBalance?.map(
          (t: any, idx: number) =>
            t?.owner?.primaryDomain?.name && (
              <GridItem w="100%" h="160" key={idx}>
                <Card w={200}>
                  <CardHeader>
                    <Heading size="md" className="hover:underline hover:cursor-pointer">{t?.owner?.primaryDomain?.name}</Heading>
                  </CardHeader>
                  <CardBody>
                    <Wrap>
                      <WrapItem key={idx}>
                        <Avatar
                          name={t?.owner?.primaryDomain?.name}
                        />
                      </WrapItem>
                    </Wrap>
                  </CardBody>
                </Card>
              </GridItem>
            )
        )}
      </Grid>
    </div>
  );
}
