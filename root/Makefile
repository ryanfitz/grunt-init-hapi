REPORTER = spec
VERSION := $(shell cat package.json | grep version | grep -o -E '[0-9]+\.[0-9]+\.[0-9]+')

DESTDIR ?=
BIN = $(DESTDIR)/opt/services/bin

.PHONY: test test-unit release clean

default: build

build:
	npm rebuild
	@echo Done

test: test-unit

test-unit:
	@grunt test

release:
	@git tag -a v$(VERSION) -m 'release version $(VERSION)'
	@git push
	@git push --tags

install:
	install -d $(BIN) $(DESTDIR)/opt/services/{%= name %}
	cp -r ./bin ./config ./node_modules ./lib ./package.json index.js $(DESTDIR)/opt/services/{%= name %}
	chmod +x $(DESTDIR)/opt/services/{%= name %}/bin/*
