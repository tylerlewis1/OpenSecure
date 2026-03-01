# OpenSecure 🛡️

OpenSecure is an open-source, DIY home security system designed to bridge the gap between affordability and professional-grade security. By leveraging the power of **Raspberry Pi** as a central hub and **ESP32** microcontrollers as modular sensor nodes, OpenSecure provides a customizable, privacy-focused alternative to commercial security systems.


## 🚀 Features

- **Centralized Hub Control:** A Raspberry Pi-based server that manages all incoming data and system logic.
- **Modular Sensor Nodes:** ESP32 modules allow for easy expansion (motion sensors, door/window contacts, cameras).
- **Web-Based Dashboard:** Real-time monitoring and system control via a sleek, responsive interface.
- **Privacy First:** All data stays on your local network—no mandatory cloud subscriptions or third-party tracking.
- **Low Cost:** Built using industry-standard, affordable hobbyist hardware.

## 📁 Repository Structure

- **/hub**: Contains the core server logic and communication protocols for the Raspberry Pi.
- **/dashboard**: The frontend web interface for monitoring alerts and managing settings.
- **/mods**: Firmware and configuration files for the ESP32 sensor modules.

## 🛠️ Hardware Requirements

- **Central Hub:** Raspberry Pi 3/4/5 (Running Raspberry Pi OS).
- **Nodes:** ESP32 Development Boards.
- **Peripherals:** PIR motion sensors, magnetic reed switches, or ESP32-CAM modules (depending on your setup).

## 💻 Getting Started

### 1. Set up the Hub
Navigate to the `/hub` directory and install the necessary dependencies:
```bash
cd hub
npm install
npm start
