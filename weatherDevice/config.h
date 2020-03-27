#ifndef _CONFIG_H
#define _CONFIG_H

//Device configuration
String address = "";
String APIAddress = "192.168.1.117:4000";

//Configuration
const String deviceId = String(ESP.getChipId() & 0xffff, HEX);
String devicePassword = "123";
String weatheralarmtype = "";
String lastRequest = "";
String location = "";
bool alarm = 0;

//Weather information
String currentWeather = "";
int temperature = 0;
int windspeed = 0;

//Misc
long oldTime = 0;
long currentMillis = 0;

//Bools
int showDaily = 1;
int showWeekly = 0;
int registered = 0;

#endif
