files := dist/index.html dist/main.css $(filter-out dist/posts/base.html,$(patsubst src/%.jinja2,dist/%,$(wildcard src/posts/*)))

all: $(files)

clean:
	rm -rf $(files)

.PHONY: all clean

dist/%: data.yaml src/%.jinja2 src/base.html.jinja2 src/%
	jinja2 $(patsubst dist/%,src/%,$@).jinja2 data.yaml > $@
