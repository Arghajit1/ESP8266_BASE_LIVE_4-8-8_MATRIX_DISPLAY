#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <MD_Parola.h>
#include <MD_MAX72xx.h>
#include <SPI.h>

#define HARDWARE_TYPE MD_MAX72XX::FC16_HW
#define MAX_DEVICES 4
#define CS_PIN D4

const char* ssid = "Argha";
const char* password = "Argha123";

ESP8266WebServer server(80);
MD_Parola P = MD_Parola(HARDWARE_TYPE, CS_PIN, MAX_DEVICES);

char displayBuffer[100] = "Ready...";
bool newMessageAvailable = true;
uint16_t defaultSpeed = 30;  // Faster default speed (lower is faster)

void setup() {
  Serial.begin(115200);
  delay(10);

  // Init matrix with faster default settings
  P.begin();
  P.setInvert(false);
  P.setIntensity(7);
  P.setSpeed(defaultSpeed);  // Set faster default speed
  P.displayClear();

  // WiFi connect
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi connected");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  // Show IP on LED
  strcpy(displayBuffer, WiFi.localIP().toString().c_str());
  newMessageAvailable = true;

  // Set up HTTP endpoints
  server.on("/display", handleDisplay);
  server.on("/clear", handleClear);
  server.onNotFound(handleNotFound);
  
  server.begin();
  Serial.println("HTTP server started");
  Serial.println("Ready to receive messages...");
}

void loop() {
  server.handleClient();
  
  if (P.displayAnimate()) {
    if (newMessageAvailable) {
      P.displayReset();
      newMessageAvailable = false;
    }
  }
}

void handleDisplay() {
  if (server.method() != HTTP_GET) {
    server.send(405, "text/plain", "Method Not Allowed");
    Serial.println("Received invalid method (not GET)");
    return;
  }

  String message = server.arg("message");
  String effect = server.arg("effect");
  String speed = server.arg("speed");
  String brightness = server.arg("brightness");
  String spacing = server.arg("spacing");

  // Print received parameters to Serial Monitor
  Serial.println("\n=== Received New Message ===");
  Serial.print("Message: "); Serial.println(message);
  Serial.print("Effect: "); Serial.println(effect);
  Serial.print("Speed: "); Serial.println(speed);
  Serial.print("Brightness: "); Serial.println(brightness);
  Serial.print("Spacing: "); Serial.println(spacing);

  if (message.length() > 0) {
    message.toCharArray(displayBuffer, sizeof(displayBuffer));
    
    // Process speed parameter (lower values = faster)
    uint16_t displaySpeed = defaultSpeed;
    if (speed.length() > 0) {
      displaySpeed = constrain(speed.toInt(), 0, 100); // Accept values 0-100
      // Convert to appropriate speed range (0-100 to 0-255, where lower is faster)
      displaySpeed = map(displaySpeed, 0, 100, 0, 255);
    }
    P.setSpeed(displaySpeed);
    Serial.print("Set speed to: "); Serial.println(displaySpeed);
    
    if (brightness.length() > 0) {
      int brightnessValue = constrain(brightness.toInt(), 0, 15);
      P.setIntensity(brightnessValue);
      Serial.print("Set brightness to: "); Serial.println(brightnessValue);
    }
    
    textEffect_t textEffect = PA_SCROLL_LEFT;
    if (effect == "scroll") textEffect = PA_SCROLL_LEFT;
    else if (effect == "fade") textEffect = PA_FADE;
    else if (effect == "open") textEffect = PA_OPENING;
    else if (effect == "close") textEffect = PA_CLOSING;
    
    Serial.print("Selected effect: ");
    switch(textEffect) {
      case PA_SCROLL_LEFT: Serial.println("Scroll Left"); break;
      case PA_FADE: Serial.println("Fade"); break;
      case PA_OPENING: Serial.println("Opening"); break;
      case PA_CLOSING: Serial.println("Closing"); break;
      default: Serial.println("Unknown"); break;
    }
    
    P.displayText(displayBuffer, PA_LEFT, displaySpeed, 500, textEffect, textEffect);
    newMessageAvailable = true;
    
    Serial.println("Message displayed on LED matrix");
    Serial.println("===========================");
    server.send(200, "text/plain", "Message displayed");
  } else {
    Serial.println("Error: No message provided");
    Serial.println("===========================");
    server.send(400, "text/plain", "No message provided");
  }
}

void handleClear() {
  Serial.println("Received clear display command");
  P.displayClear();
  Serial.println("Display cleared");
  server.send(200, "text/plain", "Display cleared");
}

void handleNotFound() {
  Serial.print("Received unknown request: ");
  Serial.println(server.uri());
  server.send(404, "text/plain", "Not Found");
}