import { Component, Input,OnInit } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import {DataCountryService} from '../../../auth/_services/dataCountry.service'
import { CountryTreeGrid } from '../../../model/country-tree-grid';
interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  name: string;
  critical: number;
  country: number;
  cases:number;
  recovered:number;
  totalTests:number;
  todayCases: number;
  deaths:number;
  todayDeaths:number;
  createdAt:string;
}

@Component({
  selector: 'ngx-tree-grid',
  templateUrl: './tree-grid.component.html',
  styleUrls: ['./tree-grid.component.scss'],
})
export class TreeGridComponent implements OnInit {
  customColumn = 'Pais';
  defaultColumns = [ 
    "Continente",
    "Casos",
    "Enfermos",
    "Casos_Criticos",
    "Recuperados",
    "Fallecidos",
    "Muestras_Tomadas",
    "Casos_Recientes",
    "Muertes_Recientes",
    "Fecha"
   ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];
  dataSource: NbTreeGridDataSource<FSEntry>;
  data: TreeNode<FSEntry>[];
  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
    public dataCountryService: DataCountryService) {
      setTimeout(() => {
        this.dataSource = this.dataSourceBuilder.create(this.data);
      }, 500);
  }
  ngOnInit(){
    this.getDataCountriesTreeGrid()

    //console.log( )

  }
  getDataCountriesTreeGrid() {
    this.dataCountryService.getDataCountriesTreeGrid().subscribe(
      data => {
        this.dataCountryService.dataCountriesTreeGrid = data as CountryTreeGrid
        this.data =this.dataCountryService.dataCountriesTreeGrid .response as TreeNode<FSEntry>[]
        console.log("data table",this.data)
        //busca como poner afuera estoy seguro que el subscribe es una promesa
        // tiene un tiempo que demora y por eso no se muestra 
      },
      err => {
        console.log(err)
      }
    );
   }
  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  //private data: TreeNode<FSEntry>[] = 
  //  [
  //   {
  //     data: { name: 'Projects', country: '1.8 MB',cases:'d' ,todayCases: 0, deaths: 0,todayDeaths:0,createdAt:""},
  //     // children: [
  //     //   { data: { name: '1.8 MB', todayCases: 0, deaths: 0,todayDeaths:0,createdAt:"" } },
  //     //   { data: { name: '1.8 MB', todayCases: 0, deaths: 0,todayDeaths:0,createdAt:"" } },
  //     //   { data: { name: '1.8 MB', todayCases: 0, deaths: 0,todayDeaths:0,createdAt:"" } },
  //     //   { data: { name: '1.8 MB', todayCases: 0, deaths: 0,todayDeaths:0,createdAt:"" } },
  //     // ],
  //   },
    // {
    //   data: { codeCountry: 'dwad', country: '1.8 MB', todayCases: 0, deaths: 0,todayDeaths:0,createdAt:""},
    //   // children: [
    //   //   { data: { name: 'Report 1', kind: 'doc', size: '100 KB' } },
    //   //   { data: { name: 'Report 2', kind: 'doc', size: '300 KB' } },
    //   // ],
    // },
    // {
    //   data: { name: 'Other', kind: 'dir', size: '109 MB', items: 2 },
    //   children: [
    //     { data: { name: 'backup.bkp', kind: 'bkp', size: '107 MB' } },
    //     { data: { name: 'secret-note.txt', kind: 'txt', size: '2 MB' } },
    //   ],
    // },
  // ];

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }
}

@Component({
  selector: 'ngx-fs-icon',
  template: `
    <nb-tree-grid-row-toggle [expanded]="expanded" *ngIf="isDir(); else fileIcon">
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
      <nb-icon icon="file-text-outline"></nb-icon>
    </ng-template>
  `,
})
export class FsIconComponent {
  @Input() kind: string;
  @Input() expanded: boolean;

  isDir(): boolean {
    return this.kind === 'dir';
  }
}
