from multiprocessing import Pipe, Process
from lights_main import main as lights_main
from http_main import main as http_main
import logging
from os import path, chdir

def main():
    try:
        chdir(path.dirname(path.realpath(__file__)))

        logging.basicConfig(
            filemode='a',
            filename="/var/log/lampki.log",
            format='[{asctime}] {name} {levelname}: {message}',
            style='{',
            level=logging.INFO,
        )
        mainLog = logging.getLogger()
        lightsLogger = logging.getLogger('lights')
        httpLogger = logging.getLogger('server')

        connA, connB = Pipe()

        httpProc = Process(target=http_main, args=(connA, httpLogger))
        lightsProc = Process(target=lights_main, args=(connB, lightsLogger))

        httpProc.start()
        mainLog.info("Started http server process with pid=%d", httpProc.pid)

        lightsProc.start()
        mainLog.info("Started lights process with pid=%d", lightsProc.pid)

        httpProc.join()
        lightsProc.join()
    except KeyboardInterrupt:
        mainLog.info("Killed by keyboard interrupt [Ctrl+C]")
    except:
        mainLog.exception("An error ocurred!")

if __name__ == "__main__":
    main()

