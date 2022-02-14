#!/bin/bash
ffmpeg -i $1 -vcodec h264 -acodec mp2 $2
rm $1