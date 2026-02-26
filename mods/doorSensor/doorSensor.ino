#include <WiFi.h>
#include <PubSubClient.h>
#include "env.h"

// -------------------- USER SETTINGS --------------------

const char* mqtt_server = MQTT_HOST;   // your broker IP
const int   mqtt_port   = MQTT_PORT;             // your broker port
const char* mqtt_topic  = MQTT_TOPIC_DOOR; // topic to publish

// -------------------- DOOR SENSOR --------------------
#define DOOR_PIN  15  // GPIO for reed switch
// Reed switch wiring:
//   CLOSED door  -> pin pulled LOW (GND)
//   OPEN door    -> pin pulled HIGH (internal pull-up)

WiFiClient espClient;
PubSubClient client(espClient);

int lastDoorState = -1;  // unknown at boot

// -------------------- WIFI --------------------
void setup_wifi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);

  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected");
}

// -------------------- MQTT --------------------
void reconnect() {
  while (!client.connected()) {
    Serial.print("Connecting to MQTT...");
    if (client.connect("ESP32_DoorSensor")) {
      Serial.println("connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" retrying in 2 seconds");
      delay(2000);
    }
  }
}

// -------------------- SETUP --------------------
void setup() {
  Serial.begin(115200);

  pinMode(DOOR_PIN, INPUT_PULLUP); // reed switch uses pull-up

  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
}

// -------------------- LOOP --------------------
void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  int doorState = digitalRead(DOOR_PIN); // HIGH=open, LOW=closed

  if (doorState != lastDoorState) {
    lastDoorState = doorState;

    if (doorState == HIGH) {
      client.publish(mqtt_topic, "OPEN");
      Serial.println("Door OPEN");
    } else {
      client.publish(mqtt_topic, "CLOSED");
      Serial.println("Door CLOSED");
    }
  }

  delay(50); // debounce
}