import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { NbThemeService } from '@nebular/theme';
import { registerMap } from 'echarts';
import { DataCountryService } from '../../../auth/_services/dataCountry.service'
import { CountryFormatMap } from '../../../model/country-format-map';
@Component({
  selector: 'ngx-bubble-map',
  styleUrls: ['./bubble-map.component.scss'],
  template: `
    <nb-card>
      <div echarts (click)="chooseCountry()" [options]="options" class="echarts"></div>
    </nb-card>
  `,
})
export class BubbleMapComponent implements OnDestroy, OnInit {

  latlong: any = {};
  mapData: any[];
  max = -Infinity;
  min = Infinity;
  options: any;

  bubbleTheme: any;
  geoColors: any[];

  private alive = true;
  private check = false;

  constructor(private theme: NbThemeService,
    private dataCountryService: DataCountryService,
    private http: HttpClient) {
    this.getDataCountries()

   setTimeout(() => {
    combineLatest([
      this.http.get('assets/map/world.json'),
      this.theme.getJsTheme(),
    ])
      .pipe(takeWhile(() => this.alive))
      .subscribe(([map, config]: [any, any]) => {

        registerMap('world', map);

        const colors = config.variables;
        this.bubbleTheme = config.variables.bubbleMap;
        this.geoColors = [colors.primary, colors.info, colors.success, colors.warning, colors.danger];
         this.latlong  =  this.dataCountryService.dataCountriesFormatMap.latlong;
         const DataMapFinish = []
        for (const iterator of this.dataCountryService.dataCountriesFormatMap.mapData) {
          let addMapData = {
            'color': this.getRandomGeoColor()
          }
           let newMapData = {
             ...iterator,
             ...addMapData
           }
           DataMapFinish.push(newMapData)
        }
        //console.log("DataMapFinish",DataMapFinish)
        this.mapData = DataMapFinish ;

        this.mapData.forEach((itemOpt) => {
          if (itemOpt.value > this.max) {
            this.max = itemOpt.value;
          }
          if (itemOpt.value < this.min) {
            this.min = itemOpt.value;
          }
        });

        this.options = {
          title: {
            text: 'COVID-19 Map',
            left: 'center',
            top: '16px',
            textStyle: {
              color: this.bubbleTheme.titleColor,
            },
          },
          tooltip: {
            trigger: 'item',
            formatter: params => {
              return `${params.name}: ${params.value[2]}`;
            },
          },
          visualMap: {
            show: false,
            min: 0,
            max: this.max,
            inRange: {
              symbolSize: [6, 60],
            },
          },
          geo: {
            geo: 'COVID-19 Map',
            type: 'map',
            map: 'world',
            roam: true,
            label: {
              emphasis: {
                show: false,
              },
            },
            itemStyle: {
              normal: {
                areaColor: this.bubbleTheme.areaColor,
                borderColor: this.bubbleTheme.areaBorderColor,
              },
              emphasis: {
                areaColor: this.bubbleTheme.areaHoverColor,
              },
            },
            zoom: 1.1,
          },
          series: [
            {
              type: 'scatter',
              coordinateSystem: 'geo',
              data: this.mapData.map(itemOpt => {
                return {
                  name: itemOpt.name,
                  value: [
                    this.latlong[itemOpt.code].longitude,
                    this.latlong[itemOpt.code].latitude,
                    itemOpt.value,
                  ],
                  itemStyle: {
                    normal: {
                      color: itemOpt.color,
                    },
                  },
                };
              }),
            },
          ],
        };
      });
     }, 200);
    }
  ngOnInit(): void { }
  ngOnDestroy() {
    this.alive = false;
  }
  chooseCountry(){
    this.check =true;
    console.log("probando evento click",this.check)
    
  }
  getDataCountries() {
 
    this.dataCountryService.getDataCountriesFormatMap().subscribe(
      data => {
      //  console.log("getDataCountries", data)
        this.dataCountryService.dataCountriesFormatMap = data as CountryFormatMap;

      },
      err => {
        console.log(err)
      }
    );
  }

  private getRandomGeoColor() {
    const index = Math.round(Math.random() * this.geoColors.length);
    return this.geoColors[index];
  }
}
