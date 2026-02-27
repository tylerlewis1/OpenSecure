#include <WiFi.h>
#include <PubSubClient.h>
#include "env.h"

// --------------------
// WiFi Credentials
// --------------------
const char* ssid = WIFI_SSID;
const char* password = WIFI_PASS;

// --------------------
// MQTT
// --------------------
WiFiClient espClient;
PubSubClient mqtt(espClient);

const char* mqtt_server = MQTT_HOST;
const int   mqtt_port   = MQTT_PORT;

const char* topic_armed = MQTT_TOPIC;

// --------------------
// Keypad Pins
// --------------------
const int colPins[4] = {13, 12, 14, 27};  // C1, C2, C3, C4
const int rowPins[4] = {26, 25, 33, 32};  // L1, L2, L3, L4
const int lightPin = LED_PIN;

char keys[4][4] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};

// --------------------
// Password System
// --------------------
String correctPassword = PASSWORD;
String enteredPassword = "";
bool systemArmed = false;

// --------------------
// WiFi Setup
// --------------------
void setupWiFi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(300);
    Serial.print(".");
  }

  Serial.println("\nWiFi connected");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
}

// --------------------
// MQTT Reconnect
// --------------------
void mqttReconnect() {
  while (!mqtt.connected()) {
    Serial.println("Connecting to MQTT...");
    if (mqtt.connect("OpenSecureKeypad")) {
      Serial.println("MQTT connected");
    } else {
      Serial.println("Retrying MQTT in 2 seconds...");
      delay(2000);
    }
  }
}

// --------------------
// Publish Armed State
// --------------------
void publishArmedState(bool armed) {
  if (!mqtt.connected()) mqttReconnect();
  mqtt.loop();

  if (armed) {
    mqtt.publish(topic_armed, "1", true);
  } else {
    mqtt.publish(topic_armed, "0", true);
  }
}

// --------------------
// Setup
// --------------------
void setup() {
  Serial.begin(115200);

  setupWiFi();                          // <-- ADDED
  mqtt.setServer(mqtt_server, mqtt_port);

  pinMode(lightPin, OUTPUT);

  // Rows as outputs
  for (int r = 0; r < 4; r++) {
    pinMode(rowPins[r], OUTPUT);
    digitalWrite(rowPins[r], HIGH);
  }

  // Columns as inputs
  for (int c = 0; c < 4; c++) {
    pinMode(colPins[c], INPUT_PULLUP);
  }

  Serial.println("Keypad Password System Ready");
}

// --------------------
// Main Loop
// --------------------
void loop() {
  if (!mqtt.connected()) mqttReconnect();
  mqtt.loop();

  char key = getKey();

  if (key != 0) {
    Serial.print("Key pressed: ");
    Serial.println(key);

    // CLEAR
    if (key == '*') {
      enteredPassword = "";
      Serial.println("Password cleared");
      return;
    }

    // ENTER
    if (key == '#') {
      if (enteredPassword.length() == 4) {
        if (enteredPassword == correctPassword) {
          systemArmed = !systemArmed;

          if (systemArmed) {
            publishArmedState(true);
            digitalWrite(lightPin, HIGH);
            Serial.println("SYSTEM ARMED");
          } else {
            publishArmedState(false);
            digitalWrite(lightPin, LOW);
            Serial.println("SYSTEM DISARMED");
          }

        } else {
          Serial.println("Incorrect Password");
        }
      } else {
        Serial.println("Enter 4 digits before pressing #");
      }

      enteredPassword = "";
      return;
    }

    // DIGITS
    if (key >= '0' && key <= '9') {
      if (enteredPassword.length() < 4) {
        enteredPassword += key;
        Serial.print("Entered: ");
        Serial.println(enteredPassword);
      } else {
        Serial.println("Already 4 digits, press # or *");
      }
    }
  }
}

// --------------------
// Keypad Scanner
// --------------------
char getKey() {
  for (int r = 0; r < 4; r++) {
    digitalWrite(rowPins[r], LOW);

    for (int c = 0; c < 4; c++) {
      if (digitalRead(colPins[c]) == LOW) {
        delay(200);
        digitalWrite(rowPins[r], HIGH);
        return keys[r][c];
      }
    }

    digitalWrite(rowPins[r], HIGH);
  }

  return 0;
}