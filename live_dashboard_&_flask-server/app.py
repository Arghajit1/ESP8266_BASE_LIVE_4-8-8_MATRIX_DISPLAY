from flask import Flask, request, jsonify, send_from_directory
import requests
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# IP address of your ESP8266 device
ESP8266_IP = '192.168.111.60'  # Change this to your ESP8266's IP address
ESP8266_PORT = 80  # Standard HTTP port

@app.route('/')
def index():
    """Serve the HTML interface file"""
    return send_from_directory('.', 'index.html')

@app.route('/send_message', methods=['POST'])
def send_message():
    """Send a message to the ESP8266 device."""
    try:
        message = request.form.get('message', '')
        effect = request.form.get('effect', 'scroll')
        speed = request.form.get('speed', '5')
        brightness = request.form.get('brightness', '7')
        spacing = request.form.get('spacing', '1')
        
        if not message:
            return jsonify({"status": "error", "message": "No message provided"})
        
        # Construct the URL with parameters
        esp_url = f'http://{ESP8266_IP}:{ESP8266_PORT}/display'
        params = {
            'message': message,
            'effect': effect,
            'speed': speed,
            'brightness': brightness,
            'spacing': spacing
        }
        
        print(f"Sending request to ESP8266: {esp_url} with params: {params}")
        
        # Send the message to the ESP8266
        response = requests.get(esp_url, params=params, timeout=10)
        
        if response.status_code == 200:
            return jsonify({
                "status": "success", 
                "message": "Message successfully sent to display"
            })
        else:
            return jsonify({
                "status": "error", 
                "message": f"Failed to send message: {response.text}"
            })
    
    except requests.exceptions.RequestException as e:
        return jsonify({
            "status": "error", 
            "message": f"Connection error: {str(e)}"
        })
    except Exception as e:
        return jsonify({
            "status": "error", 
            "message": f"Server error: {str(e)}"
        })

@app.route('/clear_display', methods=['POST'])
def clear_display():
    """Clear the LED matrix display."""
    try:
        # Send clear command to ESP8266
        esp_url = f'http://{ESP8266_IP}:{ESP8266_PORT}/clear'
        response = requests.get(esp_url, timeout=10)
        
        if response.status_code == 200:
            return jsonify({
                "status": "success", 
                "message": "Display cleared successfully"
            })
        else:
            return jsonify({
                "status": "error", 
                "message": f"Failed to clear display: {response.text}"
            })
    
    except requests.exceptions.RequestException as e:
        return jsonify({
            "status": "error", 
            "message": f"Connection error: {str(e)}"
        })
    except Exception as e:
        return jsonify({
            "status": "error", 
            "message": f"Server error: {str(e)}"
        })

@app.route('/health_check', methods=['GET'])
def health_check():
    """Simple endpoint to check if server is running."""
    return jsonify({"status": "success", "message": "Server is running"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)