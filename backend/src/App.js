import { Route } from "react-router-dom";
import "./App.css";
import { Box, Button, ButtonGroup, Container, Tab, TabList, Tabs, Text, TabPanel, TabPanels } from "@chakra-ui/react";
import HomePage from "./pages/home-page";
import ChatPage from "./pages/chat-page";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import SocketChat from "./components/socketChat/SocketChat";
function App() {
  return (
    // <div className="app">
    //   <Route path="/" component={HomePage} exact/>
    //   {/* {/* <Route path="/" component={}/> */}
    //   <Route path="/chat" component={ChatPage}/>
    // </div>
    <div className="app">
      {/* <Container maxWidth={"xl"} centerContent>
        <Box
          d="flex"
          
          p={3}
          w={"100%"}
          m={"40px 0 15px 0"}
          borderRadius={"lg"}
          borderWidth={"1px"}
          background={"#fff"}
        >
          <Text
            fontSize={"4xl"}
            fontFamily={"work sans"}
            color={"dark"}
            textAlign={"center"}
          >
            Talk-a-Tive
          </Text>
        </Box>
        <Box
          d="flex"
          alignItems={"center"}
          p={4}
          w={"100%"}
          m={"40px 0 15px 0"}
          borderRadius={"lg"}
          borderWidth={"1px"}
          background={"#fff"}
        >
          <Tabs variant="soft-rounded" mb={'1rem'}>
            <TabList d={'flex'}  justifyContent={"space-between"}>
              <Tab width={'50%'}>Login</Tab>
              <Tab width={'50%'}>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login/>
              </TabPanel>
              <TabPanel>
                <Signup/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container> */}

      <SocketChat/>
    </div>
  );
}

export default App;
