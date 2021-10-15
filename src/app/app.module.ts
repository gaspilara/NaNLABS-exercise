import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImgixAngularModule } from '@imgix/angular';
// Components
import { HeaderComponent } from './components/header/header.component';
import { SidepanelComponent } from './components/side-panel/side-panel.component';
import { MainComponent } from './components/main/main.component';
import { BottompanelComponent } from './components/bottom-panel/bottom-panel.component';
import { HistoryControlComponent } from './components/history-control/history-control.component';
import { ImageCanvasComponent } from './components/image-canvas/image-canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidepanelComponent,
    MainComponent,
    BottompanelComponent,
    HistoryControlComponent,
    ImageCanvasComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ImgixAngularModule.forRoot({
      domain: 'assets.imgix.net',
      defaultImgixParams: {
        auto: 'format,compress',
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
