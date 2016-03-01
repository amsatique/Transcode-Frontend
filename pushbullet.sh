#!/bin/bash

MSG=$(tail -n 1 /var/log/messages)
curl -u ${PUSHBULLET_API}: https://api.pushbullet.com/v2/pushes -d type=note -d title="Dev informations" -d body="$MSG"
