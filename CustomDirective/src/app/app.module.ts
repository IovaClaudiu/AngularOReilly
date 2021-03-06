import { BasicHighlightDirective } from './basic-highlight/basic-highlight.directive';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BetterHighlightDirective } from './better-highligh/better-highlight.directive';
import { UnlessDirective } from './unless.directive';

@NgModule({
  declarations: [
    AppComponent,
    BasicHighlightDirective,
    BetterHighlightDirective,
    UnlessDirective,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
