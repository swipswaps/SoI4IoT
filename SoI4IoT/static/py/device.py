# Target: Device request mgt
# Version: 0.1
# Date: 2017/06/05
# Mail: guillain@gmail.com
# Copyright 2017 GPL - Guillain

from flask import Flask, session, redirect, url_for, escape, request
from flask import render_template, jsonify, send_file
from werkzeug.utils import secure_filename
from tools import logger, exeReq, wEvent

import re, os, sys, urllib

from flask import Blueprint
device_api = Blueprint('device_api', __name__)

# Conf app
api = Flask(__name__)
api.config.from_object(__name__)
api.config.from_envvar('FLASK_SETTING')

# Device creation form -------------------------------------------
@device_api.route('/newDevice', methods=['POST', 'GET'])
def newDevice():
    wEvent('/newDevice', 'request','Get new device','')
    return render_template('device.html')

# Save device ------------------------------------------------
@device_api.route('/saveDevice', methods=['POST'])
def newDeviceSub():
    try:
        sql  = "INSERT INTO device SET uid = (SELECT uid FROM user WHERE login = '" + request.form['login'] + "'), "
        sql += "  name = '" + request.form['name'] + "', "
        sql += "  status = '" + request.form['status'] + "', description = '" + request.form['description'] + "' "
        sql += "ON DUPLICATE KEY UPDATE uid = (SELECT uid FROM user WHERE login = '" + request.form['login'] + "'), "
        sql += "  status = '" + request.form['status'] + "', description = '" + request.form['description'] + "';"
        exeReq(sql)
        wEvent('/saveDevice','exeReq','Save','OK')
        return 'Save OK'
    except Exception as e:
        wEvent('/saveDevice','exeReq','Save','KO')
        return 'Save error'

# View Device ---------------------------------------------------
@device_api.route('/viewDevice', methods=['POST', 'GET'])
def viewDevice():
    try:
        sql  = "SELECT d.did, u.login, d.name, d.description, d.status, d.lastupdate "
        sql += "FROM device d, user u "
        sql += "WHERE d.uid = u.uid AND d.name = '" + request.args['name'] + "';"
        view = exeReq(sql)
        wEvent('/viewDevice','exeReq','Get','OK')
        return render_template('device.html', view = view[0])
    except Exception as e:
        wEvent('/viewDevice ','exeReq','Get','KO')
        return 'View error'

# List --------------------------------------------------------
@device_api.route('/listDevice', methods=['POST', 'GET'])
def listDevice():
    try:
        sql  = "SELECT d.name, u.login, d.status, d.lastupdate "
        sql += "FROM device d, user u "
        sql += "WHERE d.uid = u.uid;"
        list = exeReq(sql)
        wEvent('/listDevice','exeReq','Get list','OK')
        return render_template('listDevice.html', list = list)
    except Exception as e:
        wEvent('/listDevice','exeReq','Get list','KO')
        return 'List error'

# Map ----------------------------------------------------------
@device_api.route('/mapDevice', methods=['GET', 'POST'])
def mapDevice():
    try:
        data = exeReq("SELECT t.gps FROM tracking t, device d WHERE t.did = d.did AND d.name = '" + request.args['name'] + "';")
        wEvent('/mapDevice','exeReq','Get','OK')
        return render_template('gmap.html', gmap = data)
    except Exception as e:
        wEvent('/mapDevice','exeReq','Get','KO')
        return 'Map error'

