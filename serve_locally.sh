#!/bin/bash

mv _config.yml _config.bak.yml
sed 's/remote_theme: riggraz\/no-style-please/theme: no-style-please/' _config.bak.yml > _config.yml
jekyll serve
rm _config.yml
mv _config.bak.yml _config.yml
