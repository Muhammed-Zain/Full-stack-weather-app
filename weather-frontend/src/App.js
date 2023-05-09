import React, {useState} from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Stack,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Heading,
  Image,
  StackDivider,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Center, Square, Circle } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  function containsOnlyNumbers(str) {
    return /^[0-9]+$/.test(str);
  }
  function containsNumbers(str) {
    return /\d/.test(str);
  }

  const apiCall = async () => {
    if(city===""){
      alert("Enter a city name!")
      return;
    }
    if(containsNumbers(city)){
      alert("Enter a valid city. Maybe you should try removing numeric instances")
      return;
    }
    setIsLoad(true);
    const url = `http://localhost:5000/weather/${city}`;
    const res = await fetch(url);
    if(!res.ok){
      alert("Enter a Valid City Name")
      setIsLoad(false);
    }
    const data = await res.json();
    console.log(data);
    setWeather({
      descp: data.weather[0].description,
      temp: Math.round(data.main.temp),
      city: data.name,
      humidity: data.main.humidity,
      press: data.main.pressure,
      icon: data.weather[0].icon,
    });
    setIsLoad(false);
  };

  return (
    <ChakraProvider>
      <Center marginTop={50} marginLeft={30}>
        <div>
          <Input
            type="text"
            placeholder="Enter city name"
            onChange={(e) => setCity(e.target.value)}
            maxWidth={200}
            marginRight={3}
          />
          <Button
            colorScheme="facebook"
            onClick={apiCall}
            marginBottom={1}
            isLoading={isLoad}
          >
            Submit
          </Button>
        </div>
      </Center>
      {weather && (
        <>
          <Center>
            <Card marginTop={10} w={{ base: '200px', md: '350px', lg: '500px' }}>
              <CardBody>
                <Image
                  src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt="Weather Icon"
                  borderRadius="lg"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{weather.city}</Heading>
                  <Text>Description: {weather.descp}</Text>
                  <Text color="blue.600" fontSize="2xl">
                    Temp: {weather.temp}°C
                  </Text>
                  <Text color="blue.600" fontSize="2xl">
                    Humidity: {weather.humidity}
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
            </Card>
          </Center>
        </>
      )}
    </ChakraProvider>
  );
}

export default App;
