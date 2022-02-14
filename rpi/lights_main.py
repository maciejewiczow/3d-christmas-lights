from logging import Logger
from multiprocessing.connection import Connection
import time
import json
from rpi_ws281x import PixelStrip, ws
from sys import argv

# LED strip configuration:
LED_COUNT = 50        # Number of LED pixels.
LED_PIN = 18          # GPIO pin connected to the pixels (must support PWM!).
LED_FREQ_HZ = 800000  # LED signal frequency in hertz (usually 800khz)
LED_DMA = 10          # DMA channel to use for generating signal (try 10)
LED_BRIGHTNESS = 255  # Set to 0 for darkest and 255 for brightest
LED_INVERT = False    # True to invert the signal (when using NPN transistor level shift)
LED_CHANNEL = 0
# LED_STRIP = ws.SK6812_STRIP_RGBW
LED_STRIP = ws.WS2811_STRIP_RGB

def main(conn: Connection, log: Logger, configFilePath: str):
    try:
        with open(configFilePath) as file:
            config = json.load(file)

        LED_COUNT = config['ledCount']

        effectFile = config['currentEffect'] if len(argv) < 2 else argv[1]

        log.info('Loaded currentEffect="%s" and lightCount=%d', effectFile, LED_COUNT)

        with open("./effects/{}.json".format(effectFile)) as file:
            effect = json.load(file)

        strip = PixelStrip(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL, LED_STRIP)
        strip.begin()

        while True:
            for frame in effect['lights']:
                for i, color in enumerate(frame):
                    if i < LED_COUNT:
                        if type(color) is str:
                            color = int(color, 0)

                        strip.setPixelColor(i, color)

                strip.show()
                time.sleep(effect['frameDelayMs'] / 1000)

                if conn.poll():
                    effectName = conn.recv()

                    log.info('Changing effect from "%s" to "%s"', config['currentEffect'], effectName)

                    with open("./effects/{}.json".format(effectName)) as file:
                        effect = json.load(file)

                    config['currentEffect'] = effectName

                    with open(configFilePath, 'w') as f:
                        json.dump(config, f)

                    break
    except KeyboardInterrupt:
        log.info("Killed by keyboard interrupt [Ctrl+C]")
    except:
        log.exception("An error ocurred!")
