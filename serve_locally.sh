#!/bin/bash

LOCK="$PWD/.jekyll_lock"

(
    flock -n 9 || exit 1
    mv _config.yml _config.bak.yml
    sed 's/remote_theme: riggraz\/no-style-please/theme: no-style-please/' _config.bak.yml > _config.yml
    jekyll serve
    rm _config.yml
    mv _config.bak.yml _config.yml
) 9>$LOCK
