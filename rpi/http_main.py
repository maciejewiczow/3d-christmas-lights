from crypt import methods
from logging import Logger
from multiprocessing.connection import Connection
from flask import Flask, request, jsonify
from glob import glob
from os import path
import json

def main(conn: Connection, log: Logger, configFilePath: str):
    try:
        app = Flask(log.name)

        routes(app, conn, configFilePath)

        app.run(host='0.0.0.0', port=80)
    except KeyboardInterrupt:
        log.info("Killed by keyboard interrupt [Ctrl+C]")
    except:
        log.exception("An error ocurred!")

def listEffects():
    files = (path.basename(filePath) for filePath in glob("./effects/*.json"))
    return [path.splitext(filename)[0] for filename in files if ".template" not in filename]

def routes(app: Flask, conn: Connection, configFilePath: str):
    @app.route("/effects", methods=["GET"])
    def getEffects():
        return jsonify(listEffects())

    @app.route("/effects", methods={"PUT"})
    def setCurrent():
        effects = listEffects()

        arg = request.get_json()

        if arg is None:
            return jsonify(None), 400

        effect = arg.get('effect')

        if effect is None:
            return jsonify(None), 400

        if effect not in effects:
            return jsonify('Effect not found'), 404

        conn.send(effect)

        return jsonify(None), 204

    @app.route("/effects", methods=["POST"])
    def addEffect():
        # adding new effect via http
        raise NotImplementedError

    @app.route("/effects/current", methods=["GET"])
    def getCurrent():
        with open(configFilePath) as file:
            config = json.load(file)

        return jsonify(config['currentEffect'])

    @app.route("/needsSetup", methods=["GET"])
    def needsSetup():
        return jsonify(path.isfile('/etc/raspiwifi/host_mode'))
