import { Component } from '@angular/core';
import { take } from 'rxjs';
import { ImageUtilityService, TextToImageProperties } from 'src/standalone/services/image-utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'disi-angular-standalone';
  public imageText: string = 'Write what you want here';
  public base64Image: string | undefined;
  public imageProperty = { 
    font: '24pt -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,Liberation Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
    textColor: 'black',
    centerOnImage: true,
    imageType: 'image/png'
  } as TextToImageProperties;

  constructor(private imageUtilityService: ImageUtilityService) {}

  public ConvertTextToImage(): void {
    const base64Img = this.imageUtilityService.textToImage(this.imageText, this.imageProperty).pipe(take(1)).subscribe({
      next: (htmlImage: HTMLImageElement | undefined) => {
        this.base64Image = htmlImage?.src;
      }
    });

  }
}
