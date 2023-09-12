import CalInvite from "@/components/CalInvite";
import Calculator from "@/components/Calculator";
import { Box, Button, Container, Flex } from "@radix-ui/themes";

export default function Home() {
  return (
    <>
      <Container py={"6"}>
        <div className="flex flex-col">
          <Calculator />

          <div className="grid grid-cols-2 gap-4 w-fit">
            <a href="https://twitter.com/dougiesilkstone">
              <Button variant="outline">Learn More On Twitter</Button>
            </a>
            <CalInvite />
          </div>
        </div>
      </Container>
    </>
  );
}
