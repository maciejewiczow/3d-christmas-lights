import colorsys
from dataclasses import dataclass
from random import random

@dataclass
class Color:
    r: float = 0
    g: float = 0
    b: float = 0

    @staticmethod
    def hsv(h: float, s: float, v: float) -> 'Color':
        res = Color()
        res.r, res.b, res.g = colorsys.hsv_to_rgb(h, s, v)
        return res

    @staticmethod
    def hls(h: float, l: float, s: float) -> 'Color':
        res = Color()
        res.r, res.b, res.g = colorsys.hls_to_rgb(h, l, s)
        return res

    @staticmethod
    def rgb(r: float, g: float, b: float) -> 'Color':
        res = Color()

        if (r,g,b) > (1,1,1):
            r /= 255
            g /= 255
            b /= 255

        res.r, res.g, res.b = r, g, b
        return res

    def toHls(this):
        return colorsys.rgb_to_hls(this.r, this.g, this.b)

    def copy(this) -> 'Color':
        res = Color()
        res.r, res.g, res.b = this.r, this.g, this.b
        return res

    def __int__(this):
        return (int(this.r*255) << 16) | (int(this.g*255) << 8) | int(this.b*255)

    def __imul__(this, mult: float) -> None:
        if (mult > 1):
            mult = 1

        this.r *= mult
        this.g *= mult
        this.b *= mult

        return this


    def __mul__(this, mult: float) -> 'Color':
        res = this.copy()
        res *= mult
        return res

    def __iadd__(this, other: 'Color') -> None:
        this.r += other.r
        this.g += other.g
        this.b += other.b

        if this.r > 1:
            this.r = 1

        if this.g > 1:
            this.g = 1

        if this.b > 1:
            this.b = 1

        return this

    def __add__(this, other: 'Color') -> 'Color':
        res = this.copy()
        res += other
        return res

    def __str__(this):
        return "#{:x}".format(int(this)).lower()

    def __repr__(this):
        return str(this)

    def lightness(this, l: float):
        res = this.copy()

        h, _, s = colorsys.rgb_to_hls(this.r, this.g, this.b)
        res.r, res.g, res.b = colorsys.hls_to_rgb(h, l, s)

        return res

    def hue(this, h: float):
        res = this.copy()

        _, l, s = colorsys.rgb_to_hls(this.r, this.g, this.b)
        res.r, res.g, res.b = colorsys.hls_to_rgb(h, l, s)

        return res


    def blend(this, other: 'Color', fraction: float) -> 'Color':
        return this*(1-fraction) + other*fraction


def randomColor() -> int:
    return int(Color.rgb(random(), random(), random()))
