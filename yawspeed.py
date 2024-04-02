import pynput.mouse
import pynput.keyboard
import time
import threading
import pyautogui

# Initialize variables
right_pressed = False
left_pressed = False
screen_width, screen_height = pyautogui.size()

# Callback for mouse click
def on_click(x, y, button, press):
    global right_pressed, left_pressed
    if button == pynput.mouse.Button.x1:
        right_pressed = press
    elif button == pynput.mouse.Button.x2:
        left_pressed = press

# Callback for keyboard press
def on_press(key):
    global right_pressed, left_pressed
    if key == pynput.keyboard.KeyCode.from_char(''):
        right_pressed = True
    elif key == pynput.keyboard.KeyCode.from_char(''):
        left_pressed = True
    elif key == pynput.keyboard.Key.esc:
        # Stop listener
        return False

# Callback for keyboard release
def on_release(key):
    global right_pressed, left_pressed
    if key == pynput.keyboard.KeyCode.from_char(''):
        right_pressed = False
    elif key == pynput.keyboard.KeyCode.from_char(''):
        left_pressed = False

# Function for mouse movement
def mouse_movement():
    mouse = pynput.mouse.Controller()
    while True:
        if right_pressed:
            x, y = mouse.position
            if x < screen_width:
                mouse.move(7, 0)
            time.sleep(0.0001)
        elif left_pressed:
            x, y = mouse.position
            if x > 0:
                mouse.move(-7, 0)
            time.sleep(0.0001)
        else:
            time.sleep(0.1)

# Start listeners for mouse and keyboard
def start_listeners():
    mouse_listener = pynput.mouse.Listener(on_click=on_click)
    mouse_listener.start()

    keyboard_listener = pynput.keyboard.Listener(
        on_press=on_press,
        on_release=on_release
    )
    keyboard_listener.start()

    # Run the listeners in the background
    mouse_listener.join()
    keyboard_listener.join()

# Start listeners and mouse movement in the same thread
start_listeners_thread = threading.Thread(target=start_listeners)
start_listeners_thread.start()

# Run the mouse movement function in the main thread
mouse_movement()
