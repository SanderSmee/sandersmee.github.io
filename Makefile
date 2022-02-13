SHELL = /bin/bash

.PHONY: help
.DEFAULT_GOAL := help

THIS_FILE := $(lastword $(MAKEFILE_LIST))

ifeq ($(HOST_NAME), )
HOST_NAME :=localhost
endif

help:                   ## Show this help.
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'

install:				## Install dependencies
	npm install

run:
	npx hexo server
server: run
generate:			## Generate the website
	npx hexo generate
regenerate: clean generate
discard:
	git checkout -- source
	git clean -f source
clean:
	rm -rf public
	rm db.json
cleanfull: clean
	sudo rm -rf node_modules && rm -rf themes/thoughts/node_modules
