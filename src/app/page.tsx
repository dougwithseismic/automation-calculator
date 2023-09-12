import CalInvite from "@/components/CalInvite";
import Calculator from "@/components/Calculator";
import {
  Box,
  Button,
  Container,
  Flex,
} from "@radix-ui/themes";

export default function Home() {
  return (
    <>
      <Container py={"6"}>
        <Flex direction={"column"}>
          <Calculator />
          <Box mt={"6"}>
            <a href="https://twitter.com/dougiesilkstone">
              <Button>Learn More On Twitter</Button>
            </a>
            <CalInvite/>

          </Box>
        </Flex>
      </Container>
    </>
  );
}
