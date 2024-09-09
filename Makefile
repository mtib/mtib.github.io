files := dist/index.html dist/main.css
all: $(files)

clean:
	rm -rf $(files)

.PHONY: all clean

dist/%: data.yaml src/%.jinja2 src/base.html.jinja2
	jinja2 $(patsubst dist/%,src/%,$@).jinja2 data.yaml > $@
