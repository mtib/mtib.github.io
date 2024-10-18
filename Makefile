files := dist/index.html dist/main.css $(patsubst src/%.jinja2,dist/%,$(wildcard src/posts/*.jinja2))

all: $(files)

clean:
	rm -rf $(files)

.PHONY: all clean

dist/%: data.yaml src/%.jinja2 src/base.html.jinja2 $(wildcard src/%)
	jinja2 $(patsubst dist/%,src/%,$@).jinja2 data.yaml > $@
