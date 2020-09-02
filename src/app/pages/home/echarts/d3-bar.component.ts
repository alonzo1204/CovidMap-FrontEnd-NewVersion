import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { DataCountryService } from '../../../auth/_services/dataCountry.service';



@Component({
  selector: 'ngx-d3-bar',
  template: `
    <ngx-charts-bar-vertical
      [scheme]="colorScheme"
      [results]="results"
      [xAxis]="showXAxis"
      [yAxis]="showYAxis"
      [legend]="showLegend"
      [xAxisLabel]="xAxisLabel"
      [yAxisLabel]="yAxisLabel">
    </ngx-charts-bar-vertical>
  `,
})
export class D3BarComponent implements AfterViewInit, OnDestroy {

  results = [ ];
  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  xAxisLabel = 'Country';
  yAxisLabel = 'Population';
  colorScheme: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService,
    public dataCountryService: DataCountryService) {
  }

  ngAfterViewInit(): void {
    this.dataCountryService.getTopFiveCountries().subscribe(
      data => {
        //console.log('DataTop: ', data.response);
        var jsonData = data.response;

        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
          const colors: any = config.variables;
          this.colorScheme = {
            domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
          };
          this.results = [
            { name: jsonData[0].data.Pais, value: jsonData[0].data.Casos },
            { name: jsonData[1].data.Pais, value: jsonData[1].data.Casos },
            { name: jsonData[2].data.Pais, value: jsonData[2].data.Casos },
            { name: jsonData[3].data.Pais, value: jsonData[3].data.Casos },
            { name: jsonData[4].data.Pais, value: jsonData[4].data.Casos },
        ]
        });
      }
    )
    
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
