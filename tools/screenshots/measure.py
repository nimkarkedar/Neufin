import sys
from PIL import Image
def L(p):
  c=[(v/255) for v in p[:3]]; c=[x/12.92 if x<=0.03928 else ((x+0.055)/1.055)**2.4 for x in c]
  return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2]
# usage: measure.py file x0 y0 x1 y1 -> worst background behind white text in box (pixels darker than text antialiasing)
f,x0,y0,x1,y1=sys.argv[1],*map(int,sys.argv[2:6])
im=Image.open(f).convert('RGB')
bg=sorted(L(im.getpixel((x,y))) for y in range(y0,y1) for x in range(x0,x1,2) if max(im.getpixel((x,y)))<170)
print(f,'worst(99.5%%) %.1f  p95 %.1f  median %.1f'%(1.05/(bg[int(len(bg)*0.995)]+0.05),1.05/(bg[int(len(bg)*0.95)]+0.05),1.05/(bg[len(bg)//2]+0.05)))
