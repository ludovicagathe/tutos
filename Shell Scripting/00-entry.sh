#!/bin/bash

# Author: Ludovic Agathe <ludovic.agathe@gmail.com>
# MIT License

USER=$(id -u -n)
SCRIPT=$(realpath $0)
PWD=$(pwd)
START=0

clear
echo "$(cat ./txt/00-welcome.txt)"

echo -e "\nInitialising with: \nuser: $USER\nworking directory: $PWD \nRunning script: $SCRIPT"

until [ $START -eq 1 ]
do
	echo -e "Start? (y/n) > \c"
	read -r
	if [ $REPLY == "y" -o $REPLY == "yes" -o $REPLY == "Y" -o $REPLY == "Yes" -o $REPLY == "YES" ]
	then
		START=1
	else
		if [ $REPLY == "n" -o $REPLY == "no" -o $REPLY == "N" -o $REPLY == "No" -o $REPLY == "NO" ]
		then
			echo "Exiting..."
			exit 0
		fi
		continue
	fi
done

clear
if [ ! -d "./tmp" ]
then
	mkdir "./tmp"
	if [ -d "./tmp" ]
	then
		echo "tmp folder created successfully"
	else
		echo "An error was encountered while creating the tmp folder"
		exit 1
	fi
fi

echo "Cleaning up..."
if [ -d "./tmp" ]
then
	rm -r "./tmp"
fi

if [ ! -d "./tmp" -a ! -d "./tmp" ]
then
	clear
	echo "Clean up successful. Thank you for using this script. Please leave your feedback at ludovic.agathe@gmail"
else
	echo "Something went wrong"
fi
#echo -e "Hello who? > \c"
#read -r
#echo "Hi $REPLY"
#echo "$PWD"
# current script directory: $0
# array: ARR=(val1 val2 val3) -> echo ${ARR[1} or echo ${ARR[*]} and echo $ARR[@] for all
# arithmetic operations: echo `expr 1<SPACE>+<SPACE>1`, e.g.  x=$(expr 1 \* 2), x=$(expr 1 \* 2) (should have spaces!)
# comparison: [ $a == $b ], [ $a != $b ], [ ! false ] (should have spaces!)
# comparison (numeric): [ $a -eq $b ] (-eq, -ne, -gt, -lt, -ge, -le)
# AND/OR: [ $a -lt 20 -a $b -gt 100 ], [ $a -lt 20 -o $b -gt 100 ]
# string comparison: [ $a = $b ], [ $a != $b ], [ -z $a ] (check 0 size), [ -n $a ] (check non-zero size), [ $a ] (check empty string)
# check for file or directory: [ -f $f ] (checks if regular file exists), [ -d $d ] check if directory exists, -g or -u -> group or user bit set, -r or -w or -x -> readable or writable or executable, -s size greater than 0, -e for either file or directory
# test


#function validate() {
#
#	exit 0
#}

#function read_args() {}
#function flag() {} # report and record errors
#function log() {} # report and record operations

#$* groups all arguments
#$@ separates arguments