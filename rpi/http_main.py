from logging import Logger
from multiprocessing.connection import Connection
from flask import Flask, request
from flask_restful import Resource, Api
from glob import glob
from os import path

def main(conn: Connection, log: Logger):
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

                return None, 200

        api.add_resource(Effects, "/effects")
        app.run(host='0.0.0.0')
    except KeyboardInterrupt:
        log.info("Killed by keyboard interrupt [Ctrl+C]")
    except:
        log.exception("An error ocurred!")
