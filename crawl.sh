#!/bin/bash

SOURCE_PATH=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)

cd "${SOURCE_PATH}/crawler" &&
  [[ -f "output.json" ]] && rm output.json
  scrapy crawl songbook -o output.json &&
  cd - || exit

cd "${SOURCE_PATH}/corpus" &&
  python3 convert.py &&
  cd - || exit 1
