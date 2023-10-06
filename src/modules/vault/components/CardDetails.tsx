import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { QRCodeSVG } from 'qrcode.react';
import React from 'react';

import { Card } from '@/components';

import { AddressCopy } from '../../../components/addressCopy';

const border = (color: string) => {
  return { border: `1px solid ${color}` };
};

const CardDetails = () => {
  return (
    <Grid>
      <Card w="100%">
        <Grid
          alignItems="center"
          justifyContent="center"
          maxW={440}
          flexDirection="column"
        >
          <HStack>
            <GridItem m={1}>
              <Flex alignItems="center" justifyContent="center" mr={3}>
                <Box
                  h="80px"
                  w="80px"
                  bg="grey.500"
                  opacity="0.2"
                  justifyContent="center"
                  alignItems="center"
                  display="flex"
                  borderRadius={10}
                >
                  {/**TODO: Text with vault initials or icon */}
                  <Heading variant="title-xl">IB</Heading>
                </Box>
              </Flex>
            </GridItem>
            <GridItem m={1}>
              <Heading mb={3} variant="title-xl">
                Infinitybase
              </Heading>

              <Text variant="description">
                Setting Sail on a Journey to Unlock the Potential of
                User-Centered Design.
              </Text>
            </GridItem>
          </HStack>

          <HStack>
            <VStack>
              <GridItem colSpan={3} m={1}>
                <Box
                  w="100%"
                  p={3}
                  backgroundColor={'white'}
                  h="100%"
                  borderRadius={10}
                >
                  <QRCodeSVG
                    //value={String(vault?.predicateAddress)}
                    value={'https://google.com'}
                    fgColor="black"
                    bgColor="white"
                    style={{
                      borderRadius: 10,
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </Box>
                <AddressCopy address="guilherm" />
              </GridItem>
            </VStack>
            <VStack minH={280} minW={200}>
              <Box width="100%">
                <Box
                  m={2}
                  width="100%"
                  display="flex"
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  <Box
                    display="flex"
                    flexDirection="row"
                    width="80%"
                    justifyContent="space-evenly"
                    alignItems="center"
                  >
                    <Heading variant="title-xl">
                      {false ? '*****' : '189.821,99'}
                    </Heading>
                    <Text variant="description" fontSize="20px">
                      USD
                    </Text>
                  </Box>
                  <Box
                    display="flex"
                    width="18%"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {true ? (
                      <ViewIcon boxSize={6} />
                    ) : (
                      <ViewOffIcon boxSize={6} />
                    )}
                  </Box>
                </Box>
                <Text variant="description">Vault balance</Text>
              </Box>
              <Box>
                <Button minW={130} variant="primary">
                  Deposit
                </Button>
                <Text variant="description">
                  When I hear the buzz of the little world...
                </Text>
              </Box>
              <Box>
                <Button minW={130} variant="primary">
                  Send
                </Button>
                <Text variant="description">
                  When I hear the buzz of the little world...
                </Text>
              </Box>
            </VStack>
          </HStack>
        </Grid>
      </Card>
    </Grid>
  );
};

export { CardDetails };
