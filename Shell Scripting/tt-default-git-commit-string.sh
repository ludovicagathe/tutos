#!/bin/bash
git add .
MY_STRING=$(if [ $(date +"%H") -gt 21 -o $(date +"%H") -le 5 ];then echo "night";fi;)$(if [ $(date +"%H") -gt 5 -a $(date +"%H") -le 11 ];then echo "morning";fi;)$(if [ $(date +"%H") -gt 11 -a $(date +"%H") -le 17 ];then echo "afternoon";fi;)$(if [ $(date +"%H") -gt 17 -a $(date +"%H") -le 21 ];then echo "evening";fi;)

git commit -am $(date +"%Y%m%d")" - "$MY_STRING
git pull