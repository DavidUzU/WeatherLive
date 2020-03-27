#include "settings.h"
#include "weatherDevice.h"
#include "config.h"

#include <ESP8266WiFi.h>
#include <DNSServer.h>
#include <WiFiManager.h>   
#include <ESP8266HTTPClient.h>

// Init wifiManager
WiFiManager wifiManager;

// Set web server port number to 80
WiFiServer server(80);

void setup() {

  // Initialize the serial monitor
  Serial.begin(115200);
  
  //Start Wi-Fi Manager
  wifiManager.autoConnect("Weermeter", "passw0rd");

  //Init button
  pinMode(BUTTON_PIN, INPUT_PULLUP); 

 //Register Device with unique MAC Address 
 registerDeviceMessage(WiFi.macAddress());

}

void loop(){
  
  //Check for button press
  if (digitalRead(BUTTON_PIN) == LOW)  {
    int counter = 0;
    int timeMilli = 0;
    while (digitalRead(BUTTON_PIN) == LOW) {
      timeMilli = millis();
      counter++;
      delay(10);
    if (counter > 500) {
      wifiManager.resetSettings();
    }
    //Release button
    if(digitalRead(BUTTON_PIN) == HIGH){
      if(showDaily == 1){
        showDaily = 0;
        showWeekly = 1;
      } else {
        showWeekly = 0;
        showDaily = 1;
      }
    }
  }
    delay(250);
  }

  currentMillis = millis();
  
  //Every requestDelay send a request to the server
  if (currentMillis > oldTime + REQUEST_DELAY) {
    requestMessage(WiFi.macAddress());
    oldTime = currentMillis;
  }

 //Show weather information on LCD
 if(showDaily == 1 && showWeekly == 0){
  showDailyWeather();
 } else {
  showWeeklyWeather();
 }
 
  //Init LED Strip
  if(alarm == 1){
      checkWeatherAlarm();
  } else {
      stopWeatherAlarm();
  } 
  
}
