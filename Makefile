files := dist/index.html dist/main.css $(patsubst src/%.jinja2,dist/%,$(wildcard src/posts/*.jinja2))

all: $(files)
	@echo $(files)

clean:
	rm -rf $(files)

.PHONY: all clean

dist/%: FORCE
	jinja2 $(patsubst dist/%,src/%,$@).jinja2 data.yaml > $@

FORCE: ;