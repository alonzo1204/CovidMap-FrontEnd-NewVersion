import { NgModule,Component } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbCheckboxModule,
  NbDatepickerModule, 
  NbInputModule,
} from '@nebular/theme';

import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';

import { GoogleMapsModule } from '@angular/google-maps';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ThemeModule } from '../../@theme/theme.module';
import { HomeComponent } from './home.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { BubbleMapComponent} from './bubble/bubble-map.component'
import { EchartsPieComponent } from './echarts/echarts-pie.component';
import { D3BarComponent} from './echarts/d3-bar.component'
import { D3AdvancedPieComponent } from './echarts/d3-advanced-pie.component'
import { FormsModule } from '@angular/forms';
import { AddCommentComponent } from './addComment/addComment.component'
import { CommentComponent } from './comment/comment.component'



@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NgxEchartsModule,
    GoogleMapsModule,
    LeafletModule.forRoot(),
    ChartModule,
    NgxChartsModule,
    NbCheckboxModule,
    NbDatepickerModule, 
    NbInputModule,
  ],
  declarations: [
    HomeComponent,
    StatusCardComponent,
    BubbleMapComponent,
    EchartsPieComponent,
    D3BarComponent,
    D3AdvancedPieComponent,
    AddCommentComponent,
    CommentComponent


  
  ],
})
export class HomeModule { }
