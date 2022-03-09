# -*- coding: UTF-8 -*-
'''
@Project ：youtube_highlight_extract 
@File ：ExtensionApiHandler.py
@IDE  ：PyCharm 
@Author ： Hwang
@Date ：2022-03-10 오전 1:38 
'''

import json

from flask_restful import Api, Resource, reqparse

def get_bookmarker(URL_ID):
    path = './bookmarker_storage/' + URL_ID + '.json'
    with open(path, 'r', encoding="UTF-8") as fp:
        return json.load(fp)

def _check_platform(url) :
    if url[:32] == "https://www.youtube.com/watch?v=" :
        return 1, url[32:]
    if url[:29] == "https://www.twitch.tv/videos/" :
        return 2, url[29:]
    return 0, None

class ExtensionApiHandler(Resource):
    def get(self):
        return {
            'status' : '200',
            'message' : 'This is get method in extension'
        }

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('url', type=str)

        args = parser.parse_args()

        request_url = args['url']

        _, url_id = _check_platform(request_url)
        bookmarker = get_bookmarker(url_id)

        return {
            'status': '200',
            'message': 'success get bookmarker',
            'bookmarker' : bookmarker,
        }