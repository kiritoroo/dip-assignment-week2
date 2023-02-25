import base64
import numpy as np
import cv2 as cv

def cvt_to_grayscale(img: np.matrix) -> any:
  b, g, r = img[:, :, 0], img[:, :, 1], img[:, :, 2]
  img_grayscale = 0.2989 * r + 0.5870 * g + 0.1140 * b

  return img_grayscale

def split_rgb_v1(img: np.matrix) -> tuple[np.matrix, np.matrix, np.matrix]:
  r = img.copy()
  g = img.copy()
  b = img.copy()

  b[:,:,1] = b[:,:,0]
  b[:,:,2] = b[:,:,0]

  g[:,:,0] = g[:,:,1]
  g[:,:,2] = g[:,:,1]

  r[:,:,0] = r[:,:,2]
  r[:,:,1] = r[:,:,2]

  return r, g, b


def split_rgb_v2(img: np.matrix) -> tuple[np.matrix, np.matrix, np.matrix]:
  r = img.copy()
  g = img.copy()
  b = img.copy()

  b[:,:,1] = 0
  b[:,:,2] = 0

  g[:,:,0] = 0
  g[:,:,2] = 0

  r[:,:,0] = 0
  r[:,:,1] = 0

  return r, g, b

def split_cmy(img: np.matrix) -> tuple[np.matrix, np.matrix, np.matrix]:
  r = img.copy()
  g = img.copy()
  b = img.copy()

  b[:,:,1:] = 0
  g[:,:,0:3:2] = 0
  r[:,:,:2] = 0

  c = g + b
  m = r + b
  y = r + g

  return c, m , y

def split_cmyk(img: np.matrix) -> tuple[np.matrix, np.matrix, np.matrix, np.matrix]:
  b, g, r = img[:, :, 0].astype(float), img[:, :, 1].astype(float), img[:, :, 2].astype(float)
  height = img.shape[0]
  width = img.shape[1]

  c = np.zeros(shape=(height, width), dtype=np.uint8)
  m = c.copy()
  y = c.copy()
  k = c.copy()

  def cvt_pixel(_r: int, _g: int, _b: int):
    rgb_scale = 255
    cmyk_scale = 100
    if (_r == 0) and (_g == 0) and (_b == 0):
      return 0, 0, 0, cmyk_scale

    _r = _r / float(rgb_scale)
    _g = _g / float(rgb_scale)
    _b = _b / float(rgb_scale)

    w = max(_r, _g, _b)
    
    _c = (w - _r) / w
    _m = (w - _g) / w
    _y = (w - _b) / w
    _k = (1 - w)

    return _c * cmyk_scale, _m * cmyk_scale, _y * cmyk_scale, _k * cmyk_scale

  for i in range(height):
    for j in range(width):
      c[i,j], m[i,j], y[i,j], k[i,j] = cvt_pixel(_r=r[i,j], _g=g[i,j], _b=b[i,j])

  return c, m, y, k

def split_hsv(img: np.matrix) -> tuple[np.matrix, np.matrix, np.matrix]:
  b, g, r = img[:, :, 0].astype(float), img[:, :, 1].astype(float), img[:, :, 2].astype(float)
  height = img.shape[0]
  width = img.shape[1]

  h = np.zeros(shape=(height, width), dtype=np.uint8)
  s = h.copy()
  v = h.copy()

  def cvt_pixel(_r: int, _g: int, _b: int):
    rgb_scale = 255
    _r = _r / float(rgb_scale)
    _g = _g / float(rgb_scale)
    _b = _b / float(rgb_scale)


    _v = max(_r, _g, _b)
    cmin = min(_r, _g, _b)

    _s = 0 if _v == 0 else (_v-cmin)/float(_v)

    if (_v-cmin) == 0:
      _h = 0
    elif _v == _r:
      _h = 60 * (((_g - _b) /(_v-cmin)) % 6)
    elif _v == _g:
      _h = 60*((_b-_r)/(_v-cmin) + 2)
    elif _v == _b:
      _h = 60*((_r-_g)/(_v-cmin) + 4)

    return _h/2, _s*rgb_scale, _v*rgb_scale

  for i in range(height):
    for j in range(width):
      h[i,j], s[i,j], v[i,j] = cvt_pixel(_r=r[i,j], _g=g[i,j], _b=b[i,j])

  return h, s, v

def cvt_to_negative(img: np.matrix) -> np.matrix:
  height, width, _ = img.shape
  img_negative = img.copy()

  def cvt_pixel(_r: int, _g: int, _b: int):
    _r = 255 - _r
    _g = 255 - _g
    _b = 255 - _b

    return [_b, _g, _r]

  for i in range(height):
    for j in range(width):
      img_negative[i,j] = cvt_pixel(img[i, j, 0], img[i, j, 1], img[i, j, 2])

  return img_negative

def conv(img: np.matrix, kernel_size: int) -> np.matrix:
  img = cv.cvtColor(img, cv.COLOR_BGRA2GRAY)
  k = np.ones((kernel_size, kernel_size))/25
  kh, kw = k.shape
  h, w = img.shape
  img_conv = np.ones((h, w))
  for i in range(0, h-kh+1):
    for j in range(0, w-kw+1):
      sA = img[i:i+kh, j:j+kw]
      img_conv[i,j]=np.sum(k*sA)
  img_conv = img_conv[0:h-kh+1,0:w-kw+1]
  img_conv = np.array(img_conv, dtype=np.uint8)

  return img_conv

def log_tranform(img: np.matrix, c: int, r: int) -> np.matrix:
  img_log = c * (np.log(img+r))
  img_log = np.array(img_log, dtype=np.uint8)

  return img_log

def gamma(img: np.matrix, c: int, g: int):
  img_gamma = c*(img**g)
  img_gamma = np.array(img_gamma, dtype=np.uint8)

  return img_gamma
  