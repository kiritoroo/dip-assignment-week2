from fastapi import APIRouter, Form
from .utils import \
  b64_to_cvimg, \
  cvimg_to_b64
from .controller import \
  cvt_to_grayscale, \
  split_rgb_v1, \
  split_rgb_v2, \
  split_cmy,\
  split_cmyk, \
  split_hsv, \
  cvt_to_negative, \
  conv, \
  log_tranform, \
  gamma

dip_router = APIRouter(prefix='/api/dip', tags=['DIP Service'])

@dip_router.post('/')
async def dip_original(
  b64: str = Form(...)
) -> dict:
  img = b64_to_cvimg(b64=b64)
  h, w, _ = img.shape

  return {
    "title": "original",
    "dim": { "h": h, "w": w },
    "data": {
      "original": cvimg_to_b64(img)
    }
  }

@dip_router.post('/grayscale')
async def dip_grayscale(
  b64: str = Form(...)
) -> dict:
  img = b64_to_cvimg(b64=b64)
  h, w, _ = img.shape
  img_grayscale = cvt_to_grayscale(img=img)

  return {
    "title": "convert to grayscale",
    "dim": { "h": h, "w": w },
    "data": {
      "raw": cvimg_to_b64(img),
      "grayscale": cvimg_to_b64(img_grayscale)
    }
  }

@dip_router.post('/split_rgb_v1')
async def dip_rgb_v1(
  b64: str = Form(...)
) -> dict:
  img = b64_to_cvimg(b64=b64)
  h, w, _ = img.shape
  r, g, b = split_rgb_v1(img=img)

  return {
    "title": "split r - g - b v1",
    "dim": { "h": h, "w": w },
    "data": {
      "raw": cvimg_to_b64(img),
      "r": cvimg_to_b64(r),
      "g": cvimg_to_b64(g),
      "b": cvimg_to_b64(b),
    }
  }

@dip_router.post('/split_rgb_v2')
async def dip_rgb_v2(
  b64: str = Form(...)
) -> dict:
  img = b64_to_cvimg(b64=b64)
  h, w, _ = img.shape
  r, g, b = split_rgb_v2(img=img)

  return {
    "title": "split r - g - b v2",
    "dim": { "h": h, "w": w },
    "data": {
      "raw": cvimg_to_b64(img),
      "r": cvimg_to_b64(r),
      "g": cvimg_to_b64(g),
      "b": cvimg_to_b64(b),
    }
  }

@dip_router.post('/split_cmy')
async def dip_cmy(
  b64: str = Form(...)
) -> dict:
  img = b64_to_cvimg(b64=b64)
  h, w, _ = img.shape
  c, m, y= split_cmy(img=img)

  return {
    "title": "split c - m - y",
    "dim": { "h": h, "w": w },
    "data": {
      "raw": cvimg_to_b64(img),
      "c": cvimg_to_b64(c),
      "m": cvimg_to_b64(m),
      "y": cvimg_to_b64(y),
    }
  }

@dip_router.post('/split_cmyk')
async def dip_cmyk(
  b64: str = Form(...)
) -> dict:
  img = b64_to_cvimg(b64=b64)
  h, w, _ = img.shape
  c, m, y, k = split_cmyk(img=img)

  return {
    "title": "split c - m - y - k",
    "dim": { "h": h, "w": w },
    "data": {
      "c": cvimg_to_b64(c),
      "m": cvimg_to_b64(m),
      "y": cvimg_to_b64(y),
      "k": cvimg_to_b64(k)
    }
  }

@dip_router.post('/split_hsv')
async def dip_hsv(
  b64: str = Form(...)
) -> dict:
  img = b64_to_cvimg(b64=b64)
  _h, _w, _ = img.shape
  h, s, v = split_hsv(img=img)

  return {
    "title": "split h - s - v",
    "dim": { "h": _h, "w": _w },
    "data": {
      "raw": cvimg_to_b64(img),
      "h": cvimg_to_b64(h),
      "s": cvimg_to_b64(s),
      "v": cvimg_to_b64(v)
    }
  }

@dip_router.post('/cvt_negative')
async def dip_grayscale(
  b64: str = Form(...)
) -> dict:
  img = b64_to_cvimg(b64=b64)
  _h, _w, _ = img.shape
  img_negative = cvt_to_negative(img=img)

  return {
    "title": "convert to negative",
    "dim": { "h": _h, "w": _w },
    "data": {
      "raw": cvimg_to_b64(img),
      "negative": cvimg_to_b64(img_negative)
    }
  }

@dip_router.post('/conv')
async def dip_conv(
  param1: str = Form(...),
  b64: str = Form(...)
) -> dict:
  param1 = int(param1)
  img = b64_to_cvimg(b64=b64)
  _h, _w, _ = img.shape
  img_conv = conv(img=img, kernel_size=param1)
  img_grayscale = cvt_to_grayscale(img=img)

  return {
    "title": "convolution",
    "dim": { "h": _h, "w": _w },
    "data": {
      "raw": cvimg_to_b64(img_grayscale),
      "conv": cvimg_to_b64(img_conv)
    }
  }

@dip_router.post('/log_tranform')
async def dip_conv(
  param1: str = Form(...),
  param2: str = Form(...),
  b64: str = Form(...)
) -> dict:
  param1 = float(param1)
  param2 = float(param2)
  img = b64_to_cvimg(b64=b64)
  _h, _w, _ = img.shape
  img_log = log_tranform(img=img, c=param1, r=param2)

  return {
    "title": "log tranform",
    "dim": { "h": _h, "w": _w },
    "data": {
      "raw": cvimg_to_b64(img),
      "log": cvimg_to_b64(img_log)
    }
  }

@dip_router.post('/gamma')
async def dip_conv(
  param1: str = Form(...),
  param2: str = Form(...),
  b64: str = Form(...)
) -> dict:
  param1 = float(param1)
  param2 = float(param2)
  img = b64_to_cvimg(b64=b64)
  _h, _w, _ = img.shape
  img_gamma = gamma(img=img, c=param1, g=param2)

  return {
    "title": "gamma",
    "dim": { "h": _h, "w": _w },
    "data": {
      "raw": cvimg_to_b64(img),
      "gamma": cvimg_to_b64(img_gamma)
    }
  }