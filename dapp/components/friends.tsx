import React from "react";
import {
  Card,
  Grid, GridItem,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Text,
  Box,
  StackDivider,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

// @ts-ignore: Unreachable code error
export default function Friends({ friends }) {

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
      {friends?.data?.TokenBalances?.TokenBalance?.map(
        (t: any, idx: number) =>
          t?.owner?.primaryDomain?.name && (
            <GridItem w="100%" h="160" key={idx}>
              <Card w={200}>
                <CardHeader>
                  <Heading size="sm">{t?.owner?.primaryDomain?.name}</Heading>
                </CardHeader>
                <CardBody>
                  <Wrap>
                    <WrapItem key={idx}>
                      <Avatar
                        name="Kola Tioluwani"
                        src="https://bit.ly/tioluwani-kolawole"
                      />
                    </WrapItem>
                  </Wrap>
                </CardBody>
              </Card>
            </GridItem>
          )
      )}
    </Grid>
  );
}
