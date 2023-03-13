import { Component, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Component({
    standalone: true,
    selector: 'app-image-utility',
    imports: [],
    template: ``,
  })
  @Injectable({ providedIn: 'root' })
  export class ImageUtilityService {

    /**
     * textToImage
     */
    public textToImage(text: string, properties?: TextToImageProperties): Observable<HTMLImageElement | undefined> {
        return  new Observable<HTMLImageElement | undefined>((obs) => {
            try {
                if(!properties) {
                    properties = { 
                        font: '10px sans-serif',
                        textColor: 'white',
                        centerOnImage: true
                      } as TextToImageProperties;          
                }        
                let canvas = document.createElement('canvas');
                let context = canvas.getContext('2d');
                if(context) {
                    context.font = properties.font;
                    const textMetrics = context?.measureText(text);
                    const actualTextHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
                    const fontTextHeight = textMetrics.fontBoundingBoxAscent + textMetrics.fontBoundingBoxDescent;
                    canvas.width = Math.round(textMetrics.width);
                    canvas.height = Math.round(fontTextHeight);
                    context.font = properties.font;
                    context.textBaseline = 'top';
                    context.textAlign = 'left';
                    context.fillStyle = properties?.textColor ??  context.fillStyle;
                    const x = properties?.centerOnImage ? Math.round((canvas.width / 2)-(textMetrics.width/2)) : 0;
                    const y = properties?.centerOnImage ? Math.round((canvas.height / 2)-(actualTextHeight/2)) : 0;
                    context.fillText(text, x, y);
                    
                    const canvasImage = new Image();
                    canvasImage.src = canvas.toDataURL(properties?.imageType ?? 'image/jpeg', 1);
                    obs.next(canvasImage);    
                } else {
                    obs.next(undefined);    
                }
            }
            catch(ex) {
                console.error(ex);
                obs.next(undefined);
            }
        });
    }
  }

  export class TextToImageProperties {
    font!: string;
    textColor?: string;
    centerOnImage?: boolean;
    imageType?: string;
}
