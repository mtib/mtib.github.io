#!/bin/bash

mv _config.yml _config.bak.yml
cp _config.local.yml _config.yml
jekyll serve
rm _config.yml
mv _config.bak.yml _config.yml
