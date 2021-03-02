import "./CharGrid.css";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { sets } from "../Sets.json";

function CharGrid() {
  const defaultArray = sets[0].content;
  const defaultSet = sets[0].name;
  const maxWidth = "80vw";

  const [activeArray, setActiveArray] = useState(defaultArray);
  const [activeSet, setActiveSet] = useState(defaultSet);
  const [msg, setMsg] = useState("Click on the desired character to copy it to clipboard");
  const [prevId, setPrevId] = useState(0);

  useEffect(() => {
    let userLastSet = localStorage.getItem("lastSet") ? localStorage.getItem("lastSet") : defaultSet;
    setActiveSet(sets.find((x) => x.name === userLastSet).name);
    setActiveArray(sets.find((x) => x.name === userLastSet).content);
  }, [defaultSet]);

  function Buttons() {
    const buttons = sets.map((set, index) => (
      <WrapItem key={index}>
        <Button
          colorScheme="blue"
          variant="link"
          size="sm"
          onClick={() => {
            // have to reset prevID to avoid crash when switching from one
            // set to another and having non-existent prevID, eg
            // having selected char #100 but new set only has 32 characters
            setPrevId(0);
            setActiveSet(set.name);
            setActiveArray(set.content);

            document.getElementById(prevId).className = "charBox";
            localStorage.setItem("lastSet", set.name);
          }}
        >
          {set.name}
        </Button>
      </WrapItem>
    ));
    return (
      <Wrap mt="15px" spacing="15px" justify="center">
        {buttons}
      </Wrap>
    );
  }

  function select(e) {
    let selectedId = e.target.id;
    let copyText = document.getElementById(selectedId);

    copyText.select();
    document.execCommand("copy");

    copyText.className = "charBox-selected";
    document.getElementById(prevId).className = "charBox";

    setPrevId(selectedId);
    setMsg("Copied " + copyText.value + " to clipboard");
  }

  return (
    <>
      <Center p={4} flexDirection="column">
        <Box mb="15px" border="0px">
          <Text>{msg}</Text>
        </Box>
        <Accordion width={maxWidth} allowToggle mb="10px">
          <AccordionItem mb="10px" borderTop="1px dashed" borderBottom="1px dashed">
            <AccordionButton _expanded={{ bg: "rgb(248, 248, 248)" }}>
              <Box flex="1" textAlign="center">
                {activeSet}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Box>
                <Buttons />
              </Box>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Wrap spacing="10px" border="0px" maxWidth={maxWidth} id="grid">
          {activeArray.map((value, index) => (
            <WrapItem key={index}>
              <Center h="40px" bg="green.200">
                <input className="charBox" type="text" id={index} value={value} readOnly onClick={select} />
              </Center>
            </WrapItem>
          ))}
        </Wrap>
      </Center>
    </>
  );
}

export default CharGrid;
