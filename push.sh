#!/bin/bash
git add . && \
git add -u && \
read -r -p "Vvedi opisanie comitta, yopta: " desc 
git commit -m "$desc" && \
git push origin HEAD