import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthService } from "./utils/auth";
export const routes: Routes = [
  {
    path: "pages",
    loadChildren: () =>
      import("./pages/pages.module").then((m) => m.PagesModule),
    canActivate: [AuthService],
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  { path: "", redirectTo: "auth/login", pathMatch: "full" },
  { path: "**", redirectTo: "auth/login" },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
