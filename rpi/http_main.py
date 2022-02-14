from logging import Logger
from multiprocessing.connection import Connection
from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from glob import glob
from os import path
import json

def main(conn: Connection, log: Logger, configFilePath: str):
    try:
        app = Flask(log.name)
        api = Api(app)

        class Effects(Resource):
            def get(this):
                files = (path.basename(filePath) for filePath in glob("./effects/*.json"))
                return [path.splitext(filename)[0] for filename in files if ".template" not in filename]

            def put(this):
                effects = this.get()

                arg = request.get_json()

                if arg is None:
                    return None, 400

                effect = arg.get('effect')

                if effect is None:
                    return None, 400

                if effect not in effects:
                    return 'Effect not found', 404

                conn.send(effect)

                return None, 204

            def post(this):
                # adding new effect via http
                raise NotImplementedError

        api.add_resource(Effects, "/effects")

        @app.route("/effects/current", methods=["GET"])
        def getCurrent():
            with open(configFilePath) as file:
                config = json.load(file)

            return jsonify(config['currentEffect'])

        app.run(host='0.0.0.0', port=80)
    except KeyboardInterrupt:
        log.info("Killed by keyboard interrupt [Ctrl+C]")
    except:
        log.exception("An error ocurred!")
