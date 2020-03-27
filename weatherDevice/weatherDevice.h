#include <Adafruit_NeoPixel.h>
#include <WiFiManager.h>        
#include <ESP8266HTTPClient.h>
#include "config.h"
#include <ArduinoJson.h>

Adafruit_NeoPixel strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ400);

String header;

//Color on ledstrip
void colorPixel(uint8_t r, uint8_t g, uint8_t b, uint8_t brightness)
{
 for (int i = 0; i < LED_COUNT; i++){
   strip.setPixelColor(i, r, g, b, brightness);
 }
}

//Show daily weather
void showDailyWeather(){
  
}

//Show weekly weather
void showWeeklyWeather(){

  
}

//Check Weather alarm and light strip
void checkWeatherAlarm(){
 strip.begin();
 strip.setBrightness(255);
 strip.show();

  //Clouds
  if(currentWeather == weatheralarmtype) {
    colorPixel(128, 128, 128, 100);
   
  } 
  //Thunderstorm
  else if (currentWeather == weatheralarmtype){
      colorPixel(255, 255, 255, 255); 

  } 
  //Drizzle
  else if (currentWeather == weatheralarmtype){
      colorPixel(51, 153, 255, 50);

  } 
  //Rain
  else if (currentWeather == weatheralarmtype){
      colorPixel(51, 153, 255, 255); 

  } 
  //Snow
  else if (currentWeather == weatheralarmtype){
      colorPixel(0, 255, 255, 255); 

  } 
  //Mist
  else if (currentWeather == weatheralarmtype){
      colorPixel(51, 204, 204, 100); 

  } 
  //Clear
  else if (currentWeather == weatheralarmtype){
      colorPixel(255, 255, 0, 255); 

  }
     
  
}

//Reset strip
void stopWeatherAlarm(){

 strip.begin();
 colorPixel(0, 0, 0, 0); //Red Color
 strip.show();
  
}

//Send message to API to register device
void registerDeviceMessage(String deviceid) {

    if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status
        HTTPClient http;    //Declare object of class HTTPClient
        http.begin("http://"+APIAddress+"/device?deviceid="+deviceid);      //Specify request destination
        http.addHeader("Content-Type", "application/x-www-form-urlencoded", false, true);
        
        int httpCode = http.POST(""); //Send the request
        
        http.writeToStream(&Serial);  // Print the response body
        http.end();   //Close connection
 
    }
}

//Send message to API
void requestMessage(String deviceid) {
    if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status
      HTTPClient http;  //Declare an object of class HTTPClient
      http.begin("http://"+APIAddress+"/devices/weatherinfo/"+deviceid);  //Specify request destination
      int httpCode = http.GET(); //Send the request

      
      if (httpCode > 0) { //Check the returning code
        String payload = http.getString();

        StaticJsonDocument<1024> root;

        deserializeJson(root, payload);

        bool configurationUpdate = root["configurationUpdate"]; // true
        
        //Checks for a configuration update
        if(configurationUpdate == 1){
          bool rtest = root["rest"]; // true
          const char* deviceId = root["deviceId"]; // "348c"
          lastRequest = root["lastRequest"].as<String>();  // "2020-03-19T16:59:11.332Z"
          location = root["location"].as<String>(); 
          alarm = root["alarm"].as<bool>();
          weatheralarmtype = root["weatheralarm"].as<String>();
        } else {
          //Sets the current weather
          currentWeather = root["weather"][0]["main"].as<String>(); 
        } 
        
      }
 
      http.end();   //Close connection
    }

}
