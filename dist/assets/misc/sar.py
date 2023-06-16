#!/usr/bin/env python3

from PIL import Image, ImageDraw, ImageFont

WIDTH = 1600
HEIGHT = 1400
PADDING = 100
NUM_STEPS = 8

SIZE = (WIDTH * HEIGHT) / (1600.0 * 1400)

frame_height = HEIGHT - 2 * PADDING


def gen_y_cords(num_dots):
    sections = num_dots
    section_height = frame_height / sections
    return [PADDING + (i+0.5)*section_height for i in range(sections)]


def draw_point(draw, xy, fill, radius=1):
    draw.ellipse((xy[0]-radius, xy[1]-radius, xy[0] +
                  radius, xy[1]+radius), fill=fill)


def genplot():
    base = Image.new("RGBA", (WIDTH, HEIGHT), (255, 255, 255, 255))
    fnt = ImageFont.truetype("SFNS.ttf", 40)

    draw = ImageDraw.Draw(base)

    #draw.text((10, 10), "SAR", font=fnt, fill=(0, 0, 0, 255))

    frame_width = WIDTH - 2 * PADDING

    step_length = frame_width / NUM_STEPS

    for iter in range(NUM_STEPS):
        iter_x = PADDING + step_length * iter
        num_dots = 2**iter
        for (height, dot_y) in enumerate(gen_y_cords(num_dots)):
            blueness = (dot_y-PADDING)/frame_height
            draw_point(draw, (iter_x, dot_y), fill=(
                int((1-blueness) * 255), 0, int(blueness * 255), 255), radius=3)
            if iter != NUM_STEPS - 1:
                # draw lines to next dots
                num_next = num_dots * 2
                next_up = gen_y_cords(num_next)[2 * height]
                next_down = gen_y_cords(num_next)[2 * height + 1]
                next_x = iter_x + step_length
                draw.line((iter_x, dot_y, next_x, next_up),
                          fill=(255, 0, 0, 255))
                draw.line((iter_x, dot_y, next_x, next_down),
                          fill=(0, 0, 255, 255))
                if iter < 4:
                    draw.text(((iter_x + next_x) / 2 - SIZE * 30, (dot_y + next_up) / 2 - SIZE * 50),
                              "≥", font=fnt, fill=(100, 100, 100, 255))
                    draw.text(((iter_x + next_x) / 2 - SIZE * 30, (dot_y + next_down) / 2),
                              "<", font=fnt, fill=(100, 100, 100, 255))

    draw.text((WIDTH-PADDING-150, PADDING-20), "Vin=Vref",
              fill=(255, 0, 0, 255), font=fnt)
    draw.text((WIDTH-PADDING-150, HEIGHT-PADDING-30),
              "Vin=0", fill=(0, 0, 255, 255), font=fnt)

    base.save("sar.png")


if __name__ == '__main__':
    genplot()
