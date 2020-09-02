import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { DataCountryService } from '../../../auth/_services/dataCountry.service';
import { CountriesByContinent } from '../../../model/countries-by-continent';


@Component({
  selector: 'ngx-echarts-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsPieComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  dataCountryByContinent: CountriesByContinent[];

  constructor(private theme: NbThemeService,
    public dataCountryService: DataCountryService) {
  }

  ngAfterViewInit() {

    this.dataCountryService.getCountriesByContinent().subscribe(
      data => {
        
        //this.dataCountryService.countriesByContinent = data as CountriesByContinent[];
        var jsonData = data;
        this.dataCountryByContinent = this.dataCountryService.countriesByContinent;
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
    
          const colors = config.variables;
          const echarts: any = config.variables.echarts;
          //console.log("getCountriesByContinent", this.dataCountryService.countriesByContinent)
          //console.log("getCountriesByContinent jsonData: ",jsonData.body);
          var asiaValues = jsonData.body[0];
          var europeValues = jsonData.body[1];
          var oceaniaValues = jsonData.body[2];
          var northAmValues = jsonData.body[3];
          var southAmValues = jsonData.body[4];
          var africaValues = jsonData.body[5];
          

          this.options = {
            backgroundColor: echarts.bg,
            color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)',
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: ['Asia', 'Europe', 'Africa', 'North America', 'South America','Oceania'],
              textStyle: {
                color: echarts.textColor,
              },
            },
            series: [
              {
                name: 'Countries',
                type: 'pie',
                radius: '80%',
                center: ['50%', '50%'],
                data: [
                  { value: oceaniaValues.cases, name: oceaniaValues.name },
                  { value: africaValues.cases, name: africaValues.name },
                  { value: southAmValues.cases, name: southAmValues.name },
                  { value: northAmValues.cases, name: northAmValues.name },
                  { value: europeValues.cases, name: europeValues.name },
                  { value: asiaValues.cases, name: asiaValues.name },
                  
                ],
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: echarts.itemHoverShadowColor,
                  },
                },
                label: {
                  normal: {
                    textStyle: {
                      color: echarts.textColor,
                    },
                  },
                },
                labelLine: {
                  normal: {
                    lineStyle: {
                      color: echarts.axisLineColor,
                    },
                  },
                },
              },
            ],
          };
        });
    },
  err => {
    console.log(err)
  }
);
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
